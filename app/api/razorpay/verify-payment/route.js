// app/api/razorpay/verify-payment/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/db/config";
import Order from "@/models/order.models";
import Product from "@/models/product.models";

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
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      productId,
      email,
      name,
      amount,
      currency
    } = body;

    // Verify payment signature
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Fetch product details
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Create order in database
    const order = await Order.create({
      userId,
      email,
      name,
      products: [{
        productId: product._id,
        title: product.title,
        salePrice: product.salePrice,
        canvaUrl: product.canvaUrl,
        imagePath: product.imagesPath[0] || ""
      }],
      totalAmount: amount,
      payment: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'completed'
      },
      orderStatus: 'completed',
      downloadLinks: [product.canvaUrl]
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified and order created successfully",
      data: {
        orderId: order._id,
        canvaUrl: product.canvaUrl,
        productTitle: product.title
      }
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to verify payment", 
        error: error.message 
      },
      { status: 500 }
    );
  }
}