import Blog from "./blog";

export const generateMetadata = async ({ params }) => {
  const id =await params.id;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/change?id=${id}`);
  if (!res.ok) {
    return {
      title: `Number: ${id}`,
    };
  }

  const data = await res.json();
  if (!data.post || !data.post.title) {
    return {
      title: `Post Not Found`,
      description: `No content found for post ID: ${id}`,
    };
  }

  const imageUrl = data.post.images?.[0] ?? `${baseUrl}/default-og-image.jpg`;

  return {
    title: data.post.title,
    description: data.post.content,
    openGraph: {
      title: data.post.title,
      description: data.post.content,
      type: "website",
      url: `${baseUrl}/blog/${data.post._id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.post.title,
      description: data.post.content,
      images: [imageUrl],
    },
  };
};

export default function BlogPage() {
  return <Blog />;
}
