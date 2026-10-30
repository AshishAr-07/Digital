import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // userId is optional — populated for signed-in users, absent for guests
    userId: { type: String, default: null },
    email: { type: String, required: true },
    name: { type: String, required: true },
    
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: String, required: true },
        salePrice: { type: Number, required: true },
        canvaUrl: { type: String, required: true },
        imagePath: { type: String, default: "" }
      }
    ],
    
    totalAmount: { type: Number, required: true },
    
    payment: {
      razorpayOrderId: { type: String, required: true },
      razorpayPaymentId: { type: String },
      razorpaySignature: { type: String },
      status: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'], 
        default: 'pending' 
      }
    },
    
    orderStatus: {
      type: String,
      enum: ['processing', 'completed', 'failed'],
      default: 'processing'
    },
    
    downloadLinks: [{ type: String }],
    
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;