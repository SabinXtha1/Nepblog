'use client'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import CardBlog from './CardBlog'
import { toast } from 'react-toastify'


const RelatedBlog = ({ cate }) => {
  const [data, setData] = useState([])
  const [filtered, setFiltered] = useState([])
  const [category, setCategory] = useState(cate)
  console.log(cate);
  

  // ✅ Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api')
        const datas = await res.json()
        setData(datas.posts || [])
      } catch (error) {
        toast.error('Failed to fetch related data')
      }
    }
    fetchData()
  }, [])

  // ✅ Set filtered data when data changes
  useEffect(() => {
    setFiltered(data)
  }, [data])

  // ✅ Re-filter when category changes
  useEffect(() => {
    if (!data) return

   
      const filteredData = data.filter(post => post.category === category)
      setFiltered(filteredData)
      

  }, [category, data])

  return (
    <div className='my-10 '>
      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Related Articles</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our most recent blog posts on technology, design, and development.
              </p>
            </div>
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

export default RelatedBlog
