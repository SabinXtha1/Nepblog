'use client'
import axios from 'axios';
import React from 'react'


const page = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
         const send = await axios.post('/api/ok',{
            title:e.target.title.value,
            content:e.target.content.value,
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

      <textarea
        name="content"
        placeholder="Content"
      
        required
        minLength={10}
      ></textarea>

      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default page