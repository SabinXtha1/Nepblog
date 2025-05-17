import { ArrowRight, Badge, Calendar, Clock } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import CardBlog from './CardBlog'

const home = ({data}) => {
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
            <CardBlog data={data}/>
            
            <div className="flex justify-center mt-10">
              <Link href="/blog">
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

export default home
