import UserProfilePage from "./user";

export const generateMetadata = async ({ params }) => {
  const id =await params.id;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nepblog.vercel.app";

  try {
    const res = await fetch(`${baseUrl}/api/user?id=${id}`);
    if (!res.ok) throw new Error("User not found");

    const { user } = await res.json();

    if (!user || !user.name) {
      return {
        title: "User Not Found | NepBlog",
        description: `No user data found for ID: ${id}`,
      };
    }

    const imageUrl = user.userImage ?? `${baseUrl}/default-og-image.jpg`;
    const userDesc =
      user.bio?.slice(0, 160).replace(/[\n\r]/g, " ") ??
      `Read blogs by ${user.name} on NepBlog – AI-powered blogging from Nepal.`;

    return {
      title: `${user.name} | NepBlog`,
      description: userDesc,
      alternates: {
        canonical: `${baseUrl}/profile/${user._id}`,
      },
      openGraph: {
        title: `${user.name} | NepBlog`,
        description: userDesc,
        type: "profile",
        url: `${baseUrl}/profile/${user._id}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: user.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${user.name} | NepBlog`,
        description: userDesc,
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
      },
      metadataBase: new URL(baseUrl),
    };
  } catch (err) {
    return {
      title: "NepBlog User",
      description: "Explore bloggers on NepBlog",
    };
  }
};

export default function BlogPage() {
  return <UserProfilePage />;
}
