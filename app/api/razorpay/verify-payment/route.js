// app/api/razorpay/verify-payment/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/db/config";
import Order from "@/models/order.models";
import Product from "@/models/product.models";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      productId,
      email,
      name,
      currency
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    if (!productId || !email || !name) {
      return NextResponse.json(
        { success: false, message: "Product ID, email and name are required" },
        { status: 400 }
      );
    }

    // Prevent duplicate fulfillment: check if this payment was already processed
    const existingOrder = await Order.findOne({
      "payment.razorpayOrderId": razorpay_order_id,
      "payment.status": "completed",
    });

    if (existingOrder) {
      return NextResponse.json({
        success: true,
        message: "Order already fulfilled",
        data: {
          orderId: existingOrder._id,
          canvaUrl: existingOrder.products[0]?.canvaUrl,
          productTitle: existingOrder.products[0]?.title,
          alreadyFulfilled: true,
        },
      });
    }

    // Verify payment signature cryptographically
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed — invalid signature" },
        { status: 400 }
      );
    }

    // Fetch product details from DB (server-side; never trust frontend)
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Create order in database
    const order = await Order.create({
      userId: null, // guest order — no Clerk user
      email: email.trim().toLowerCase(),
      name: name.trim(),
      products: [{
        productId: product._id,
        title: product.title,
        salePrice: product.salePrice,
        canvaUrl: product.canvaUrl,
        imagePath: product.imagesPath?.[0] || ""
      }],
      totalAmount: product.salePrice, // always use server price in USD
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