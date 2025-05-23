import UserProfilePage from "./user";


export const generateMetadata = async ({ params }) => {
  const id =await params.id;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/user?id=${id}`);
  if (!res.ok) {
    return {
      title: `Number: ${id}`,
    };
  }

  const data = await res.json();
  if (!data.user || !data.user.name) {
    return {
      title: `Post Not Found`,
      description: `No content found for post ID: ${id}`,
    };
  }

  const imageUrl = data.user.userImage ?? `${baseUrl}/default-og-image.jpg`;

  return {
    title: data.user.name,
    openGraph: {
      title: data.user.name, 
      type: "website",
      url: `${baseUrl}/profile/${data.user._id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.user.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.user.name,
  
      images: [imageUrl],
    },
  };
};

export default function BlogPage() {
  return <UserProfilePage/>
}
