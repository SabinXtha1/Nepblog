'use client'

import React from 'react'
import { Calendar } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Image from 'next/image'
import { motion } from 'framer-motion'

const SingleBlog = ({ blog }) => {
  

  return (
    <motion.div
      className="max-w-3xl mx-auto pt-10 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        <Image
          src={blog.images?.[0] || '/image.jpg'}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4 mt-6">
        {blog.authorImage && blog.authorName && (
          <Avatar>
            <AvatarImage
              src={blog.authorImage}
              alt={blog.authorName}
              className="rounded-full w-8 h-8"
            />
            <AvatarFallback>{blog.authorName[0]}</AvatarFallback>
          </Avatar>
        )}
        <div>
          <p className="font-medium">{blog.authorName}</p>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>{blog.createdAt?.split('T')[0] || 'Date not available'}</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mt-6">{blog.title}</h1>

      {/* Content */}
      <div className="mt-6 text-lg leading-8 text-muted-foreground whitespace-pre-line">
        {blog.content || 'No content available.'}
      </div>
    </motion.div>
  )
}

export default SingleBlog
