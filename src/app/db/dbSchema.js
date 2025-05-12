import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
})
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
       }
})
export const User = mongoose.models.User || mongoose.model('User',userSchema);
export const Post = mongoose.models.Post || mongoose.model('Post',postSchema);