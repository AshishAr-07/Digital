import { NextResponse } from "next/server";
import { dbConnect } from "@/db/config";
import Order from "@/models/order.models";
import Product from "@/models/product.models";
import { checkAdmin } from "@/app/lib/checkAdmin";

// GET - Fetch orders
// Admin (authenticated via Clerk): all orders, or by ?id=<orderId>
// Guest: by ?email=<email>&orderId=<orderId> for order confirmation lookup
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");
    const email = searchParams.get("email");

    // Check admin status (non-fatal — returns false if not signed in)
    let isAdmin = false;
    try {
      isAdmin = await checkAdmin();
    } catch (_) {}

    if (isAdmin) {
      // Admin: full access
      if (orderId) {
        const order = await Order.findById(orderId);
        if (!order) {
          return NextResponse.json(
            { success: false, message: "Order not found" },
            { status: 404 }
          );
        }
        return NextResponse.json({ success: true, data: order });
      }

      const orders = await Order.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: orders, count: orders.length });
    }

    // Guest lookup: must provide both orderId AND email for security
    if (orderId && email) {
      const order = await Order.findOne({
        _id: orderId,
        email: email.trim().toLowerCase(),
      });

      if (!order) {
        return NextResponse.json(
          { success: false, message: "Order not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: order });
    }

    // Fetch all orders for a given email (guest order history)
    if (email) {
      const orders = await Order.find({ email: email.trim().toLowerCase() })
        .sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: orders, count: orders.length });
    }

    // No valid lookup params provided
    return NextResponse.json(
      { success: false, message: "Please provide an email address to look up orders" },
      { status: 400 }
    );
  } catch (error) {
    console.error("GET Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update order status (Admin only)
export async function PUT(request) {
  try {
    let isAdmin = false;
    try {
      isAdmin = await checkAdmin();
    } catch (_) {}

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 403 }
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

    if (razorpayPaymentId) order.payment.razorpayPaymentId = razorpayPaymentId;
    if (razorpaySignature) order.payment.razorpaySignature = razorpaySignature;
    if (paymentStatus) order.payment.status = paymentStatus;
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus === 'completed') order.orderStatus = 'completed';

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
    let isAdmin = false;
    try {
      isAdmin = await checkAdmin();
    } catch (_) {}

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
