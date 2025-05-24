"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import CardBlogSkeleton from "@/components/CardBlogSkeleton"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import Link from "next/link"

const UserProfilePage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/user?id=${id}`)
      if (!res.ok) throw new Error("Failed to fetch user")
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
            src={user.userImage || "/bigo.gif"}
            alt={"Prabesh"}
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-muted-foreground">{user.email}</p>
        <p className="text-sm text-gray-500">Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
      </motion.div>

      {/* User Blogs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xl font-bold mb-4">Blogs by {user.name}</h2>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No blog posts yet.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post._id}`}
                className="border p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 group"
              >
                {/* Image Container - Fixed width and responsive */}
                <div className="flex-shrink-0 w-full sm:w-48 md:w-56">
                  <div className="relative h-32 sm:h-28 md:h-32 w-full overflow-hidden rounded-lg">
                    <Image
                      src={post.images?.[0] || "/image.jpg"}
                      fill
                      alt="Blog post thumbnail"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Content Container - Takes remaining space */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 font-medium">{post.category || "Uncategorized"}</p>
                    <p className="text-sm line-clamp-2 text-muted-foreground mb-3">{post.content}</p>
                  </div>

                  {/* Date - Always at bottom */}
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-auto">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
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
