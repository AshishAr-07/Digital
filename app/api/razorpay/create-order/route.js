// app/api/razorpay/create-order/route.js
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { amount, currency = "INR", productId, productTitle } = body;

    if (!amount || !productId) {
      return NextResponse.json(
        { success: false, message: "Amount and product ID are required" },
        { status: 400 }
      );
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Generate short receipt ID (max 40 chars)
    const timestamp = Date.now().toString().slice(-8); // Last 8 digits
    const productIdShort = productId.toString().slice(-10); // Last 10 chars
    const receipt = `rcpt_${productIdShort}_${timestamp}`; // Total ~24 chars

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
      currency: currency,
      receipt: receipt,
      notes: {
        userId: userId,
        productId: productId,
        productTitle: productTitle,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay Create Order Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create Razorpay order", 
        error: error.message 
      },
      { status: 500 }
    );
  }
}