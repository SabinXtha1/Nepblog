'use client'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import React, { useEffect, useState } from 'react'
import UploadImage from '@/components/uploadImage';

const Page = () => {
  const [Images,setImages]= useState([])
 console.log(Images);
 
 
    const handleSubmit = async (e) => {
        e.preventDefault();
         const send = await axios.post('/api/ok',{
            title:e.target.title.value,
            content:e.target.content.value,
            images:Images
        })
        console.log(send);
        
    }
  return (
    <div>
 <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        placeholder="Title"
      
        required
        minLength={3}
      />
    <UploadImage setImages={setImages}/>

      <Textarea
        name="content"
        placeholder="Content"
      
        required
        minLength={10}
      ></Textarea>

      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Page