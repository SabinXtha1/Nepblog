'use client'
import CarsBlogSkeleton from '../components/CardBlogSkeleton'
import React, { useEffect, useState } from 'react'
import Home from '../components/home'



const Page = () => {
  const [data, setdata] = useState()
  const [loading, setLoading] = useState(true)
  const fetchData = async()=>{
    try{
      const res = await fetch('/api')
      if(!res.ok){
        throw new Error('Failed to fetch data')
      }else{
        const data =await res.json()
        console.log(data);
        setLoading(false)
        setdata(data.posts)
        
      }
    }catch(er){
      console.log(er);
      
    }
  }
  useEffect(()=>{
 fetchData()
},[])
  if(loading){
    return(
      <CarsBlogSkeleton/>
    )
  }else{
    return (
      <div>
        <Home data={data} />
      </div>
    )
  }
  
}

export default Page