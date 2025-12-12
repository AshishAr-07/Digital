import { NextResponse } from "next/server";
import { dbConnect } from "@/db/config";
import Product from "@/models/product.models";
import { checkAdmin } from "@/app/lib/checkAdmin";

// GET - Fetch all products or a single product by ID
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // Fetch single product
      const product = await Product.findById(id).select('-canvaUrl');
      if (!product) {
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: product });
    }

    // Fetch all products
    const products = await Product.find({}).select('-canvaUrl').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products", error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new product (Admin only)
export async function POST(request) {
  try {
    // Check admin authorization
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { title, description, salePrice, originalPrice, imagesPath, canvaUrl } = body;

    // Validate required fields
    if (!title || !description || !salePrice || !originalPrice || !imagesPath || !canvaUrl) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate images array
    if (!Array.isArray(imagesPath) || imagesPath.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );
    }

    // Create new product
    const product = await Product.create({
      title,
      description,
      salePrice,
      originalPrice,
      imagesPath,
      canvaUrl,
    });

    return NextResponse.json(
      { success: true, message: "Product created successfully", data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create product", error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update an existing product (Admin only)
export async function PUT(request) {
  try {
    // Check admin authorization
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { id, title, description, salePrice, originalPrice, imagesPath, canvaUrl } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Validate images array if provided
    if (imagesPath && (!Array.isArray(imagesPath) || imagesPath.length === 0)) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );
    }

    // Update product
    const product = await Product.findByIdAndUpdate(
      id,
      { title, description, salePrice, originalPrice, imagesPath, canvaUrl },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update product", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a product (Admin only)
export async function DELETE(request) {
  try {
    // Check admin authorization
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product", error: error.message },
      { status: 500 }
    );
  }
}