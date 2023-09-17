import db from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";



export async function POST(request) {
  const {emailID} = await request.json();
  await db.connect();
  const user = await User.findOne({email: emailID});
  return NextResponse.json({ user:user?._doc }, { status: 200 });
}

