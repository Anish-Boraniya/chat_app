import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/utils/db";
import Product from "@/models/product";
// POST: Create a new product
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { name, description, price, quantity } = await req.json();

    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
    });

    await newProduct.save();
    return NextResponse.json({product: newProduct}, { status: 201 });
  } catch (err) {
    console.error('Product POST error', err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

// GET: Get all products
export async function GET() {
  await connectDB();

  try {
    const products = await Product.find();

    if (products.length === 0) {
      return NextResponse.json({ message: 'No products found' }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error('Product GET error', err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
