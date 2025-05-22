"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"

export default function FeaturedPostsSlider({ autoSlideInterval = 5000, className = "", filteredDatas }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const time =Math.floor(Math.random() * 8) + 3
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const containerRef = useRef(null)

  const nextSlide = useCallback(() => {
    setDirection(1) // Moving right
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredDatas.length)
  }, [filteredDatas])

  const prevSlide = useCallback(() => {
    setDirection(-1) // Moving left
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredDatas.length - 1 : prevIndex - 1))
  }, [filteredDatas])

  const goToSlide = useCallback(
    (index) => {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
    },
    [currentIndex],
  )

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault()
      if (e.deltaX > 50 || e.deltaY > 50) {
        nextSlide()
      } else if (e.deltaX < -50 || e.deltaY < -50) {
        prevSlide()
      }
    },
    [nextSlide, prevSlide],
  )

  const handleDragEnd = useCallback(
    (_, info) => {
      const threshold = 50
      if (info.offset.x < -threshold) {
        nextSlide()
      } else if (info.offset.x > threshold) {
        prevSlide()
      }
    },
    [nextSlide, prevSlide],
  )

  // ✅ Auto slide with pause on hover
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      nextSlide()
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [nextSlide, autoSlideInterval, isPaused])

  // ✅ Mouse wheel scrolling
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      container.removeEventListener("wheel", handleWheel)
    }
  }, [handleWheel])

  // ✅ Reset currentIndex if out of bounds (e.g. after filtering)
  useEffect(() => {
    if (currentIndex >= filteredDatas.length) {
      setCurrentIndex(0)
    }
  }, [filteredDatas, currentIndex])

  // ✅ Guard against undefined or empty list
  if (!filteredDatas || filteredDatas.length === 0) return null

  const currentPost = filteredDatas[currentIndex]

  // Animation variants based on direction
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <div
      ref={containerRef}
      className={`relative touch-pan-y ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden rounded-xl">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <Card className="border bg-background shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {currentPost.category}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">{currentPost.title}</h3>
                  <p className="line-clamp-3 text-muted-foreground">{currentPost.content}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Link href={`/profile/${currentPost.author}`} className="flex items-center gap-2">
                    <div className="h-[20px] aspect-square rounded-full overflow-hidden bg-muted relative">
                      <Image
                        src={currentPost.authorImage || "/bigo.gif"}
                        alt={currentPost.authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm">{currentPost.authorName}</span>
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {
                        currentPost.readTime?(`${currentPost.readTime} read`):
                    `${time} min read`
                    }
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/blog/${currentPost._id}`}
                    className="inline-flex items-center text-sm font-medium text-primary group transition-all duration-300"
                  >
                
                    Read article
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
        
                    
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
        {filteredDatas.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "w-4 bg-primary" : "bg-primary/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Blurs */}
      <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
    </div>
  )
}
