'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import CardBlogSkeleton from '@/components/CardBlogSkeleton'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

const UserProfilePage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/user?id=${id}`)
      if (!res.ok) throw new Error('Failed to fetch user')
      const data = await res.json()
      setUser(data.user)
      setPosts(data.posts)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchUserData()
  }, [id])

  if (loading) return <CardBlogSkeleton />

  if (!user) return <p className="text-center mt-10 text-muted-foreground">User not found.</p>

  const profileImage = user.userImage || '/bigo.gif'

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* User Profile */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
    
        <div className="mx-auto w-24 h-24 my-auto rounded-full overflow-hidden mb-4">
          <Image
            src={profileImage}
            alt={user.name}
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-muted-foreground">{user.email}</p>
        <p className="text-sm text-gray-500">
          Joined on {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </motion.div>

      {/* User Blogs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4">Blogs by {user.name}</h2>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No blog posts yet.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post._id}`}
                className="border p-4 rounded-xl hover:shadow-md gap-8  flex transition"
              >
                <div>
                  
                  
 <div className="relative h-[100%] aspect-video overflow-hidden rounded-l">
            <Image
              src={post.images?.[0] || "/image.jpg"}
              fill
              alt="Blog post thumbnail"
              className="object-cover"
            />
          </div>
                </div>
                <div>

                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {post.category || "Uncategorized"}
                </p>
                <p className="text-sm line-clamp-2 text-muted-foreground">
                  {post.content}
                </p>
                <p className="text-xs mt-2 text-right text-gray-400 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default UserProfilePage
