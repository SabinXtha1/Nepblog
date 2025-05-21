// /app/api/webhooks/clerk/route.ts
import { connectDB } from "@/app/db/db";
import { User } from "@/app/db/dbSchema";


import { NextResponse } from "next/server";


export async function POST(req) {
 await connectDB()
  const body = await req.json();

  // You can log to see the event
  console.log("Clerk Webhook Event:", body);

  if (body.type === "user.created") {
    const user = body.data;
    console.log(user.email_addresses[0].email_address);
    

    // Example: Make API hit or save user to DB
    // await saveUserToDB(user);
    await User.create({
        name:user.username,
       email:user.email_addresses[0].email_address,
       userImage:user.imageUrl
        
    })

    return NextResponse.json({ message: "User created event processed." }, { status: 200 });
  }

  return NextResponse.json({ message: "Unhandled event type." }, { status: 400 });
}
