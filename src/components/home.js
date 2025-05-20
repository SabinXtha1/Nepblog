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

  // ✅ set filtered data on initial load or when data changes
  useEffect(() => {
    setFiltered(data)
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

  return (
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
      </section>
    </div>
  )
}

export default Home
