import { NextRequest, NextResponse } from "next/server";
import  connectDB  from "@/utils/db";
import User from "../../../models/User";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();
   console.log("form data",{ email,password},req);

   if(!email){
    return NextResponse.json({ error: "email not found" }, { status: 400 });
   }
   
    // Check if user exists
    const user = await User.findOne({ email: email.toString() });
    if (!user) {
      console.log("in server not email");
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }else{
      console.log("controleer user",user);
      
    }

    // Check password
    if (password !== user.password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, "scret key", {
      expiresIn: "1d",
    });

    // Return token + user data
    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
