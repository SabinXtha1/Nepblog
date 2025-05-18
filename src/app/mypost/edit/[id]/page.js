"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { ImageIcon, Loader2Icon, PlusIcon, XIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import UploadImage from "@/components/uploadImage"
import { toast } from "react-toastify"

const CreatePostPage = () => {
  const { id } = useParams()
  const router = useRouter()

  const [images, setImages] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [featured, setFeatured] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImages, setPreviewImages] = useState([])

  const fetchDataById = async () => {
    try {
      const res = await axios(`/api/change?id=${id}`)
      const resData = res.data.post
      setTitle(resData.title)
      setContent(resData.content)
      setCategory(resData.category)
      setFeatured(resData.featured)
      setImages(resData.images || [])
      setPreviewImages(resData.images || [])
    } catch (err) {
      console.error("Error fetching data by ID:", err)
    }
  }

  useEffect(() => {
    fetchDataById()
  }, [id])

  const handleImagesChange = (newImages) => {
    setImages(newImages)
    setPreviewImages(newImages)
  }

  const removeImage = (index) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)

    const updatedPreviews = [...previewImages]
    updatedPreviews.splice(index, 1)
    setPreviewImages(updatedPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await axios.put("/api/change", {
        title,
        content,
        images,
        category,
        featured,
        blogId: id,
      })

   
        // Clear form
        setTitle("")
        setContent("")
        setCategory("")
        setFeatured(false)
        setImages([])
        setPreviewImages([])

        toast.success("Post updated successfully!")
        router.back() 
        // // Optional: go back after update
    
    } catch (error) {
      console.error("Error updating post:", error)
      toast.error("Error updating post: " + (error.response?.data?.message || error.message))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
        <p className="text-muted-foreground mt-2">Update your ideas and inspirations</p>
      </div>

      <Card className="border-slate-200 shadow-md">
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>Update your blog post details below</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">
                Post Title
              </Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title"
                className="text-lg"
                required
                minLength={3}
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="featured" className="text-base">
                  Featured Post
                </Label>
                <p className="text-sm text-muted-foreground">
                  Featured posts appear at the top of your blog
                </p>
              </div>
              <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
            </div>

            <Separator />

            {/* Content Input */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-base">
                Post Content
              </Label>
              <Textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                className="min-h-[200px] resize-y"
                required
                minLength={10}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-4">

              {/* Preview Images */}
              {previewImages.length > 0 && (
                <div>
              <div className="flex items-center justify-between">
                <Label className="text-base">Images</Label>
                <p className="text-sm text-muted-foreground">
                  Upload images to enhance your post
                </p>
              </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {previewImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-md overflow-hidden border border-slate-200"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              )
              }

              {/* <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
                <UploadImage setImages={handleImagesChange} />
                <div className="mt-2 flex items-center justify-center text-sm text-muted-foreground">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  <p>Upload images to enhance your post</p>
                </div>
              </div> */}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Editing...
                </>
              ) : (
                <>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Edit Post
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Changes will be applied immediately.</p>
      </div>
    </div>
  )
}

export default CreatePostPage
