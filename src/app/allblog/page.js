'use client'

import React, { useEffect, useState } from 'react'
import CardBlog from '@/components/CardBlog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Page = () => {
  const [data, setData] = useState([])
  const [filtered, setFiltered] = useState([])
  const [category, setCategory] = useState('')

  const fetchData = async () => {
    try {
      const res = await fetch('/api')
      if (!res.ok) throw new Error('Failed to fetch data')

      const resData = await res.json()
      setData(resData.posts)
      setFiltered(resData.posts)
    } catch (er) {
      console.error(er)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!category || category === 'All') {
      setFiltered(data)
    } else {
      const filteredData = data.filter(post => post.category === category)
      setFiltered(filteredData)
    }
  }, [category, data])

  return (
    <div className='px-6 py-4 space-y-4 flex flex-col pb-20'>
      <div className=" border-b">
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Explore Our Blog</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Discover the latest articles, insights, and stories from our expert writers
          </p>
        </div>
      </div>
      {/* Category Filter */}

      <div className='flex justify-end'>

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

      {/* Blog Cards */}{filtered.length === 0 ? (
  <p className="text-muted-foreground">No blogs found in this category.</p>
) : (
  <CardBlog data={filtered} />
)}
    </div>
  )
}

export default Page
