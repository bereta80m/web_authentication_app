import { NextResponse } from "next/server";
import bycript from 'bcryptjs'

import User from "@/models/User";
import db from "@/lib/connectDB";

export async function POST(req){
    try {
        await db.connect()
        const {username, email, passwordkey, name} = await req.json()
        const isExisting = await User.findOne({email})
        if(isExisting){
            throw new Error("User already exists")
        }
        const hashedPassword = await bycript.hash(passwordkey, 10)
        const newUser = await User.create({username, name, email, password: hashedPassword,bio:"No data",image:"",phoneNumber:"No number"})
        const {password, ...user} = newUser._doc
        return NextResponse.json({user},{status:201})
        //return new Response(JSON.stringify(user), {status: 201})

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error},{status: 500})
        //return new Response(JSON.stringify(error.message), {status: 500})
    }
}
