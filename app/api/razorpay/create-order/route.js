// app/api/razorpay/create-order/route.js
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { dbConnect } from "@/db/config";
import Product from "@/models/product.models";

export async function POST(request) {
  try {
    const body = await request.json();
    const { currency = "INR", productId } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch actual price from DB — never trust frontend-submitted prices
    await dbConnect();
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Currency conversion rates (keep in sync with frontend)
    const rates = {
      INR: 83.12,
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      CAD: 1.36,
      AUD: 1.53,
    };

    const supportedCurrencies = Object.keys(rates);
    const selectedCurrency = supportedCurrencies.includes(currency) ? currency : "INR";
    const rate = rates[selectedCurrency];
    const actualAmount = product.salePrice * rate;

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Generate short receipt ID (max 40 chars)
    const timestamp = Date.now().toString().slice(-8);
    const productIdShort = productId.toString().slice(-10);
    const receipt = `rcpt_${productIdShort}_${timestamp}`;

    // Create Razorpay order
    const options = {
      amount: Math.round(actualAmount * 100), // Convert to smallest currency unit
      currency: selectedCurrency,
      receipt: receipt,
      notes: {
        productId: productId,
        productTitle: product.title,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      // Return server-computed amount for display
      displayAmount: actualAmount,
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