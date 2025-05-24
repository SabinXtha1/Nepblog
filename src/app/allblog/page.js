import AllBlog from './allblog'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nepblog.vercel.app";

export const metadata = {
  title: 'All Blogs | Explore Our Blog',
  description:
    'Discover the latest articles, insights, and stories from our expert writers. Filter blogs by category: Technology, Lifestyle, Travel, Food, Health, Business, and more.',
  alternates: {
    canonical: `${baseUrl}/allblog`,
  },
  openGraph: {
    title: 'All Blogs | Explore Our Blog',
    description:
      'Discover the latest articles, insights, and stories from our expert writers. Filter blogs by category: Technology, Lifestyle, Travel, Food, Health, Business, and more.',
    url: `${baseUrl}/allblog`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/default-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'NepBlog - All Blogs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Blogs | Explore Our Blog',
    description: 'Discover the latest articles, insights, and stories from our expert writers.',
    images: [`${baseUrl}/default-og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(baseUrl),
};

export default function BlogPage() {
  return <AllBlog />;
}
