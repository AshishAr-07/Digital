import { NextResponse } from "next/server";
import { dbConnect } from "@/db/config";
import Order from "@/models/order.models";
import Product from "@/models/product.models";
import { checkAdmin } from "@/app/lib/checkAdmin";
import { auth } from "@clerk/nextjs/server";

// POST - Create a new order
export async function POST(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { email, name, productIds, razorpayOrderId } = body;

    // Validate required fields
    if (!email || !name || !productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "Email, name, and at least one product are required" },
        { status: 400 }
      );
    }

    // Fetch product details
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { success: false, message: "One or more products not found" },
        { status: 404 }
      );
    }

    // Calculate total amount and prepare products array
    let totalAmount = 0;
    const orderProducts = products.map((product) => {
      totalAmount += product.salePrice;
      return {
        productId: product._id,
        title: product.title,
        salePrice: product.salePrice,
        canvaUrl: product.canvaUrl,
        imagePath: product.imagesPath[0] || ""
      };
    });

    // Create order
    const order = await Order.create({
      userId,
      email,
      name,
      products: orderProducts,
      totalAmount,
      payment: {
        razorpayOrderId: razorpayOrderId || `temp_${Date.now()}`,
        status: 'pending'
      },
      orderStatus: 'processing'
    });

    return NextResponse.json(
      { success: true, message: "Order created successfully", data: order },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order", error: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch orders (all for admin, user-specific for regular users)
export async function GET(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");
    const isAdmin = await checkAdmin();

    if (orderId) {
      // Fetch single order
      const order = await Order.findById(orderId).populate('products.productId');
      
      if (!order) {
        return NextResponse.json(
          { success: false, message: "Order not found" },
          { status: 404 }
        );
      }

      // Check authorization
      if (!isAdmin && order.userId !== userId) {
        return NextResponse.json(
          { success: false, message: "Unauthorized to view this order" },
          { status: 403 }
        );
      }

      return NextResponse.json({ success: true, data: order });
    }

    // Fetch multiple orders
    let query = {};
    if (!isAdmin) {
      // Regular users can only see their own orders
      query.userId = userId;
    }

    const orders = await Order.find(query)
      .populate('products.productId')
      .sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      data: orders,
      count: orders.length 
    });
  } catch (error) {
    console.error("GET Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update order (payment confirmation, status update)
export async function PUT(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { orderId, razorpayPaymentId, razorpaySignature, paymentStatus, orderStatus } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const isAdmin = await checkAdmin();

    // Check authorization
    if (!isAdmin && order.userId !== userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized to update this order" },
        { status: 403 }
      );
    }

    // Update payment details if provided
    if (razorpayPaymentId) {
      order.payment.razorpayPaymentId = razorpayPaymentId;
    }
    if (razorpaySignature) {
      order.payment.razorpaySignature = razorpaySignature;
    }
    if (paymentStatus) {
      order.payment.status = paymentStatus;
    }

    // Update order status (admin only for manual updates)
    if (orderStatus) {
      if (!isAdmin && orderStatus !== 'completed') {
        return NextResponse.json(
          { success: false, message: "Only admins can manually update order status" },
          { status: 403 }
        );
      }
      order.orderStatus = orderStatus;
    }

    // If payment is completed, update order status to completed
    if (paymentStatus === 'completed') {
      order.orderStatus = 'completed';
    }

    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      data: order
    });
  } catch (error) {
    console.error("PUT Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update order", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete order (Admin only)
export async function DELETE(request) {
  try {
    const isAdmin = await checkAdmin();
    
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
      data: order
    });
  } catch (error) {
    console.error("DELETE Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete order", error: error.message },
      { status: 500 }
    );
  }
}
