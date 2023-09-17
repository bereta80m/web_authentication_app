import db from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bycript from 'bcryptjs'

export async function POST(request) {
    const { _id, bio, phoneNumber, name,image, email, password } = await request.json();
 

    
    const hashedPassword = await bycript.hash(password, 10)
    await db.connect();
    await User.findByIdAndUpdate(_id, { bio, phoneNumber, name, image, email, password:hashedPassword});
    return NextResponse.json({ message: "User updated" }, { status: 200 });
  }
  