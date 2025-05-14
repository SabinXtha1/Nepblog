'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Page = () => {
    const [posts, setposts] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/ok');
        const data = await res.json();
        console.log(data);
        setposts(data.posts);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    
    
    fetchData();
}, []);

 const  handleSubmit =async(e)=>{
        e.preventDefault();
         const send = await axios.put('/api/change',{
            title:e.target.title.value,
            content:e.target.content.value,
            blogId:e.target.blogId.value
         })
 }


console.log(posts);

  return (
    <div>
      {
        posts ? (
            posts.map((item,id)=>{
                return (
                    <div key={id} className='border-b py-10'>
                        <form onSubmit={handleSubmit}>
                            <label>Title:
                            </label>
                       <Input   value={item.title}  name='title'/>
                       <label>
                            Content:
                       </label>
                        <Input value={item.content} name='content'/>
                        <Input value={item.authorName} name='authorName'/>
                        <Input value={item._id} name='blogId'/>
                       <Button type='submit'>
                        Submit
                       </Button>
                        </form>
                    </div>
                )
            })
        ) : ""
      }
    </div>
  );
};

export default Page;
