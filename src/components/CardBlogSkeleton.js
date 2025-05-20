'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

const CardBlogSkeleton = ({ count = 6 }) => {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 pt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(count)].map((_, i) => (
        <Card key={i} className="overflow-hidden gap-2 flex flex-col animate-pulse">
          {/* Image Skeleton */}
          <div className="w-full px-4">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-muted" />
          </div>

          {/* Author Section */}
          <div className="flex items-center px-4 pt-2 gap-3">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Title Skeleton */}
          <CardHeader className="px-4">
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>

          {/* Content Skeleton */}
          <CardContent className="px-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/5 mt-4" />
          </CardContent>

          {/* Button Skeleton */}
          <CardFooter className="p-3 pt-4 pb-1">
            <Skeleton className="h-4 w-20" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default CardBlogSkeleton
