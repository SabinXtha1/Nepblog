const mongoose = require('mongoose');


export async function connectDB() {
  const con= await mongoose.connect(process.env.MONGODB_URI);
  if(con){
  console.log('MongoDB connected');    
  }else if(!con){
    console.log('MongoDB not connected');
  }
  
}
connectDB()