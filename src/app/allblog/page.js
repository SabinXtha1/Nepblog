'use client'

import React, { useEffect, useState } from 'react'
import CardBlog from '@/components/CardBlog'
const Page = () => {
     const [data, setdata] = useState()
      const fetchData = async()=>{
        try{
          const res = await fetch('/api')
          if(!res.ok){
            throw new Error('Failed to fetch data')
          }else{
            const data =await res.json()
            console.log(data);
            setdata(data.posts)
            
          }
        }catch(er){
          console.log(er);
          
        }
      }
      useEffect(()=>{
     fetchData()
    },[])
  return (
    <div>
        <CardBlog data={data} />
    </div>
  )
}

export default Page
