"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, EditIcon, BookOpenIcon, ClockIcon, Trash } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"
import { toast } from "react-toastify"

const Page = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [featuredPost, setFeaturedPost] = useState(null)
  const [regularPosts, setRegularPosts] = useState([])
const handleDelete = async (blogId) => {
  try {
    const res = await axios.delete('/api/ok', {
      data: { blogId }, // body goes here
    });

    if (res.status === 200) {
      toast.success("Post Deleted");

      // Optionally update UI
      setPosts((prev) => prev.filter((post) => post._id !== blogId));
      setRegularPosts((prev) => prev.filter((post) => post._id !== blogId));
      if (featuredPost && featuredPost._id === blogId) {
        setFeaturedPost(null);
      }
    } else {
      toast.error("Failed to delete post");
    }
  } catch (err) {
    toast.error("Error deleting post");
    console.error(err);
  }
};


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/ok")
        const data = await res.json()

        // Sort posts by featured status and date
        const sortedPosts = [...data.posts].sort((a, b) => {
          // First sort by featured status
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          // Then sort by date (newest first)
          return new Date(b.createdAt) - new Date(a.createdAt)
        })

        setPosts(sortedPosts)

        // Set featured post and regular posts
        const featured = sortedPosts.find((post) => post.featured)
        if (featured) {
          setFeaturedPost(featured)
          setRegularPosts(sortedPosts.filter((post) => post._id !== featured._id))
        } else if (sortedPosts.length > 0) {
          // If no featured post, use the first post as featured
    
          setRegularPosts(sortedPosts)
        } else {
          setRegularPosts([])
        }
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])
  console.log(featuredPost);
  

  // Function to truncate text to a certain length
  const truncateText = (text, maxLength = 150) => {
    if (!text) return ""
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Function to estimate read time
  const estimateReadTime = (content) => {
    if (!content) return "1 min read"
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
  }

  // Function to get author initials for avatar fallback
  const getAuthorInitials = (name) => {
    if (!name) return "AU"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading your amazing content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text">
          My Creative Journal
        </h1>
        <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
          A collection of thoughts, ideas, and inspirations from my journey
        </p>
        <div className="flex justify-center mt-6">
          <Separator className="w-24 bg-gradient-to-r from-purple-600 to-pink-500 h-1 rounded-full" />
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl p-10 text-center shadow-lg border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col items-center justify-center space-y-6 py-10">
            <div className="rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-6">
              <BookOpenIcon className="h-12 w-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold">Your Story Begins Here</h3>
            <p className="text-muted-foreground max-w-md">
              Your creative journey is about to unfold. Start crafting your first post and share your unique perspective
              with the world.
            </p>
            <Button
              className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              asChild
            >
              <Link href="/create">Create Your First Post</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Featured Post */}
       {featuredPost && typeof featuredPost === "object" && featuredPost._id && (
  <div className="mb-12">
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="grid md:grid-cols-5 gap-0 p-2 rounded-xl">
        <div className="md:col-span-3 relative overflow-hidden h-[300px] md:h-[500px] rounded-xl">
          <Image
            src={featuredPost.images?.[0] || "/image.jpg"}
            alt={featuredPost.title || "Featured post"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          {featuredPost.featured && (
            <Badge className="absolute top-4 left-4 bg-white text-black hover:bg-white/90">Featured</Badge>
          )}
        </div>
        <div className="md:col-span-2 p-8 flex flex-col justify-center">
          <Badge variant="outline" className="w-fit mb-4">
            {featuredPost.category}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4">{featuredPost.title}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {truncateText(featuredPost.content, 250)}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <Avatar>
              <AvatarImage src={featuredPost.authorImage || "/placeholder.svg?height=40&width=40"} />
              <AvatarFallback>{getAuthorInitials(featuredPost.authorName)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{featuredPost.authorName}</p>
              <p className="text-xs text-muted-foreground">Content Creator</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {formatDate(featuredPost.createdAt)}
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {estimateReadTime(featuredPost.content)}
            </div>
          </div>
          <div className="flex gap-2 flex-col lg:flex-row">

          <Button
            asChild
            className="w-fit bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
            >
            <Link href={`/mypost/edit/${featuredPost._id}`}>
              <EditIcon className="h-4 w-4 mr-2" />
              Edit Featured Post
            </Link>
          </Button>
           <div onClick={()=>handleDelete(post._id)} className="w-fit bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-3xl text-white">

                   <Button
            asChild
            className="w-fit bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
            >
            <Link href={`/mypost/edit/${featuredPost._id}`}>
              <Trash className="h-4 w-4 mr-2" />
              Delete Featured Post
            </Link>
          </Button>
                      </div>
            </div>
        </div>
      </div>
    </Card>
  </div>
)}


          {/* Regular Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Card
                key={post._id}
                className="overflow-hidden group transition-all duration-300 hover:shadow-xl border border-slate-200 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-800"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.images?.[0] || `/image.jpg`}
                    alt={post.title || "Blog post image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    variant="secondary"
                  >
                    {post.category}
                  </Badge>
                </div>

                <CardHeader className="pt-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {formatDate(post.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {estimateReadTime(post.content)}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{truncateText(post.content, 120)}</p>

                  {post.images && post.images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-hidden">
                      {post.images.slice(1, 4).map((src, idx) => (
                        <div
                          key={`${src}-${idx}`}
                          className="relative h-14 w-14 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700"
                        >
                          <Image
                            src={src || "/image.jpg"}
                            alt={`Image ${idx + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {post.images.length > 4 && (
                        <div className="relative h-14 w-14 rounded-md overflow-hidden bg-slate-900 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">+{post.images.length - 4}</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.authorImage || "/placeholder.svg"} />
                      <AvatarFallback>{getAuthorInitials(post.authorName)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{post.authorName}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                  >
                    <Link href={`/mypost/edit/${post._id}`} className="flex items-center">
                      <EditIcon className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <div onClick={()=>handleDelete(post._id)}>

                  <Button variant="ghost"
                  size="sm"
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" >
                   <Trash className="h-4 w-4 mr-2" /> Delete
                  </Button>
                      </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Page
