import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    salePrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    imagesPath: [{ type: String, required: true }],
    canvaUrl: { type: String, required: true },
    linkType: { type: String, enum: ['canva', 'drive'], default: 'canva' },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
