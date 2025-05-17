import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req){
    const {prompt}= await req.json();
    try{
        const genAI= new GoogleGenerativeAI({apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY});
        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            
        });
        const genMsg= await model.generateContent(prompt)
        const res =await genMsg.response;
       const output =await res.text()



   return NextResponse.json({
        message:output,
        
   })
    }catch{
        return NextResponse.json({
            message: "Error in generate route",
        }, { status: 500 });

    }

}