import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Badge, Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const CardBlog = ({ data }) => {
  console.log(data, "IN");

  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-8 pt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data && data.length > 0 ? data.map((item, key) => (
          <Card className="overflow-hidden gap-2 flex flex-col" key={key}>
            <div className='w-full flex justify-center items-center px-4'>

                <div className='relative w-[100%] aspect-video overflow-hidden rounded-l'>

              <Image
                src={item.images?.[0] || "/placeholder.svg"}
                fill
                alt="Blog post thumbnail"
                className=" object-cover"
                />
                </div>
                </div>
            <CardHeader className="px-4">
              <h3 className="text-3xl font-bold">
                {item.title}
              </h3>
            </CardHeader>
            <CardContent className="px-4">
              
              <p className="line-clamp-2 text-muted-foreground">
                {item.content || "Blog description goes here."}
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{item.createdAt?.split("T")[0] || "Date not available"}</span>
                </div>
                {/* <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.readTime || "5 min read"}</span>
                </div> */}
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-4 pb-1">
              <Link href={item.link || "#"} className="text-sm font-medium text-primary">
                Read More →
              </Link>
            </CardFooter>
          </Card>
        )) : (
          <p className="text-center text-muted-foreground pt-10">No blog posts available.</p>
        )}
      </div>
    </div>
  )
}

export default CardBlog
