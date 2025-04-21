'use server';
import connectDB from "@/utils/db";
import { NextRequest,NextResponse } from "next/server";
import User from "../../../models/User"

export async function GET(){
    try{
        await connectDB()
        const users  = await User.find();
        if (users.length === 0) {
            return NextResponse.json({ message: 'No products found' }, { status: 404 });
          }
      
          return NextResponse.json(users, { status: 200 });

    }catch(error){
        console.log("error in get users" , error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await connectDB();
    try {
      const { firstname,lastname,email,phone, password , address} = await req.json();
     console.log("form data",req);
  
     const checkEmail = await User.findOne({email})
     if(checkEmail){
         console.log("emial already exists");
         return NextResponse.json({ error: "Email already exists" }, { status: 400 });
         
     }
     const user = new User({
         firstname,
         lastname,
         email,
         phone,
         password,
         address
     })
    
     
     await user.save()
     console.log('User added successfully');
  
  
      // Return token + user data
      return NextResponse.json(
        {
          message: "registeration successful",
          user,
        },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Login error:", error.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
  