import Blog from "./blog";

// Dynamic SEO metadata for each blog post
export const generateMetadata = async ({ params }) => {
  const id =await params.id;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nepblog.vercel.app";

  try {
    const res = await fetch(`${baseUrl}/api/change?id=${id}`);
    if (!res.ok) throw new Error("Failed to fetch");

    const { post } = await res.json();

    if (!post || !post.title) {
      return {
        title: "Post Not Found | NepBlog",
        description: `No content found for post ID: ${id}`,
      };
    }

    const imageUrl = post.images?.[0] || `${baseUrl}/default-og-image.jpg`;
    const desc =
      post.content?.slice(0, 160).replace(/[\n\r]/g, " ") || "Read this article on NepBlog";

    return {
      title: `${post.title} | NepBlog`,
      description: desc,
      alternates: {
        canonical: `${baseUrl}/blog/${post._id}`,
      },
      openGraph: {
        title: post.title,
        description: desc,
        type: "article",
        url: `${baseUrl}/blog/${post._id}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: desc,
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
      },
      metadataBase: new URL(baseUrl),
    };
  } catch (error) {
    return {
      title: `NepBlog Post`,
      description: `A blog post on NepBlog`,
    };
  }
};

export default function BlogPage() {
  return <Blog />;
}
