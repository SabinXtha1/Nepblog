'use client'
import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import CardBlog from './CardBlog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Home = ({ data }) => {
  const [filtered, setFiltered] = useState([])
  const [category, setCategory] = useState('')
  const [featuredPosts,setFeaturedPosts]= useState([])

  // ✅ set filtered data on initial load or when data changes
  useEffect(() => {
    setFiltered(data)
    setFeaturedPosts(data)
  }, [data])

  // ✅ re-filter when category changes
  useEffect(() => {
    if (!category || category === 'All') {
      setFiltered(data)
    } else {
      const filteredData = data.filter(post => post.category === category)
      setFiltered(filteredData)
    }
  }, [category, data])
    useEffect(() => {
   
      const filteredData = data.filter(post => post.featured === true)
      setFeaturedPosts(filteredData)
    }, [data])
    console.log(featuredPosts);
    

  return (
    <div>
     
       

          <div className="flex justify-end mt-6">
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Use filtered data */}
          <CardBlog data={filtered} total={5} />

          <div className="flex justify-center mt-10">
            <Link href="/allblog">
              <Button variant="outline">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
      
    </div>
  )
}

export default Home
