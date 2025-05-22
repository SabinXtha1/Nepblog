'use client'
import CarsBlogSkeleton from '../components/CardBlogSkeleton'
import React, { useEffect, useState } from 'react'
import Home from '../components/home'
import BlogHero from '@/components/Hero'
import Link from 'next/link'



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
 
    return (
      <div className='w-full'>
          {
          loading ? 
          <CarsBlogSkeleton/>
          :
          
        <BlogHero data={data}/>
        }
            <div>
      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Latest Articles</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our most recent blog posts on technology, design, and development.
              </p>
            </div>
          </div>

        {
          loading ? 
          <CarsBlogSkeleton/>
          :
          <Home data={data} />
        }
         
        </div>
      </section>
    </div>
      </div>
    )
  
  
}

export default Page