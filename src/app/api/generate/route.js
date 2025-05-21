import { connectDB } from "@/app/db/db";
import { Post, User } from "@/app/db/dbSchema";
import { NextResponse } from "next/server";

export async function POST(req){
    
    // const Users=await User.create({
    //     name:"SΛB1ΩИ",
    //     email:"SΛB1ΩИROBO@gmail.com",
    //     userImage:"/allien.webp",
    
    // })
    // console.log(Users);
    
    
    const data = await req.text()
    const splitData = data.split("{}");
    console.log(splitData);
    const cleanString = data.replace(/```json|```/g, '').trim();
    
    // 3. Parse the JSON
    const jsonData = JSON.parse(cleanString);
    
    // 4. Get the `content` field
    const content = jsonData.content;
    console.log(content);
    try{
        await connectDB()
        const Posts=await Post.create({
            title:jsonData.title,
            content:jsonData.content,
            author:"682dcf0432ec9b12fd729640",
            authorName:"SΛB1ΩИ",
            authorImage:"/allien.webp"

        })
        console.log(Posts);
        
        return NextResponse({
            msg:Posts
        })
          
     }catch{
        return NextResponse.json({
            msg:"Failed to Make POst"
        })
     }

}