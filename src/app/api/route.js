
import { Post } from "@/app/db/dbSchema";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/db";


export async function GET(req) {
  
 

  try {
   await connectDB()
    const posts = await Post.find({ });
    console.log(posts);
    return NextResponse.json({
      posts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}