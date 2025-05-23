'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, MessageCircle, Share, SendHorizonal } from 'lucide-react'
import Image from 'next/image'
import CardBlogSkeleton from '@/components/CardBlogSkeleton'
import SlickSlider from '@/components/SlickSlider'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import RelatedBlog from '@/components/RelatedBlog'
import { toast } from 'react-toastify'
import axios from 'axios'
import Link from 'next/link'

const Blog = () => {
  const router = useRouter()
  const { id } = useParams()
  const { isSignedIn } = useUser()

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [commentError, setCommentError] = useState('')

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/change?id=${id}`)
      setBlog(res.data.post)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleSubmitComment = async () => {
    if (!isSignedIn) {
      router.push('/sign-up')
      return
    }

    if (!newComment.trim()) {
      setCommentError('Comment cannot be empty.')
      return
    }

    setSubmitting(true)
    setCommentError('')

    try {
      await axios.post('/api/change', {
        blogId: id,
        comment: newComment,
      })

      await fetchData()
      toast.success('Comment submitted successfully')
      setNewComment('')
    } catch (error) {
      setCommentError('Something went wrong. Try again.')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <CardBlogSkeleton />

  if (!blog)
    return (
      <p className="text-center mt-10 text-muted-foreground">
        Blog post not found.
      </p>
    )

  return (
    <div>
      <motion.div
        className="max-w-3xl mx-auto pt-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Author */}
        <Link href={`/profile/${blog.author}`}>
          <motion.div
            className="flex items-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {blog.authorImage && blog.authorName && (
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={blog.authorImage}
                  alt={blog.authorName}
                  className="rounded-full"
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
          </motion.div>
        </Link>

        {/* Title */}
        <motion.h1
          className="text-4xl font-bold mt-6 text-wrap overflow-scroll scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {blog.title}
        </motion.h1>

        {/* Images */}
        {blog.images?.length > 0 && <SlickSlider data={blog.images} />}

        {/* Content */}
        <motion.div
          className="mt-6 text-lg leading-8 text-muted-foreground whitespace-pre-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {blog.content || 'No content available.'}
        </motion.div>

        {/* Comments */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5" />
            <h2 className="text-xl font-semibold">
              Comments ({blog.comments?.length || 0})
            </h2>
          </div>

          {blog.comments?.length > 0 ? (
            blog.comments.map((item, index) => (
              <motion.div
                key={item._id || index}
                className="flex items-start gap-4 mb-6 p-4 border rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link href={`/profile/${item.userId}`}>
                  <Image
                    src={item.userImage}
                    alt={item.username}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </Link>
                <div>
                  <Link href={`/profile/${item.userId}`}>
                    <p className="font-medium">{item.username}</p>
                  </Link>
                  <p className="text-muted-foreground text-sm">{item.comment}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-muted-foreground">No comments yet.</p>
          )}

          {/* Add Comment */}
          <div className="mt-6 space-y-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-400"
              rows={3}
            />
            {commentError && (
              <p className="text-sm text-red-500">{commentError}</p>
            )}
            <div className="flex items-center justify-between">
              <button
                onClick={handleSubmitComment}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
                <SendHorizonal className="w-4 h-4" />
              </button>

              <div
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success('Link copied to clipboard')
                }}
              >
                <Button className="mt-2">Copy Blog Link</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Related blogs */}
      <RelatedBlog cate={blog.category} />
    </div>
  )
}

export default Blog
