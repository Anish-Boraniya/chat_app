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