import { Post } from "@/app/db/dbSchema";
import { NextResponse } from "next/server";


export async function GET(req,res){
    const post = await Post.find({})
    if(post){
        return NextResponse.json({
            msg:post,
        })
    }
}