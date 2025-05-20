'use client'

import React from 'react'
import { Card as BaseCard, CardContent, CardFooter, CardHeader } from './ui/card'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { motion } from 'framer-motion'

// Wrapping Card with motion
const Card = motion(BaseCard)

const CardBlog = ({ data, total }) => {
  const renderBlogs = () => {
    if (!data || data.length === 0) {
      return (
        <p className="text-center text-muted-foreground pt-10">
          No blog posts available.
        </p>
      )
    }

    const blogsToRender = typeof total === 'number' ? data.slice(0, total) : data

    return blogsToRender.map((item, key) => (
      <Card
        key={key}
        className="overflow-hidden gap-1 flex flex-col hover:scale-102 scale-98  transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: key * 0.1 }} 
      
      >
        <div className="w-full flex justify-center items-center px-4">
          <div className="relative w-full aspect-video overflow-hidden rounded-l">
            <Image
              src={item.images?.[0] || "/image.jpg"}
              fill
              alt="Blog post thumbnail"
              className="object-cover"
            />
          </div>
        </div>
      <Link href={`profile/${item.author}`}>
        <div className="flex items-center px-4 pt-2 gap-3">
          {item.authorName !== "" && item.authorImage ? (
            <Avatar>
              <AvatarImage
                src={item.authorImage}
                alt={item.authorName}
                className="rounded-full w-4 h-4"
                />
              <AvatarFallback>{item.authorName[0]}</AvatarFallback>
            </Avatar>
          ) : null}
          <p>{item.authorName}</p>
        </div>
          </Link>

        <CardHeader className="px-4">
          <h3 className="text-2xl font-bold">{item.title}</h3>
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
          </div>
        </CardContent>

        <CardFooter className="p-3 pt-4 pb-1">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href={`/blog/${item._id}`} className="text-sm font-medium text-primary">
              Read More →
            </Link>
          </motion.div>
        </CardFooter>
      </Card>
    ))
  }

  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-8 pt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {renderBlogs()}
      </div>
    </div>
  )
}

export default CardBlog
