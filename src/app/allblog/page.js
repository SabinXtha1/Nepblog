
import AllBlog from './allblog'
 
export const metadata = {
  title: 'All Blogs | Explore Our Blog',
  description: 'Discover the latest articles, insights, and stories from our expert writers. Filter blogs by category: Technology, Lifestyle, Travel, Food, Health, Business, and more.',
  openGraph: {
    title: 'All Blogs | Explore Our Blog',
    description: 'Discover the latest articles, insights, and stories from our expert writers. Filter blogs by category: Technology, Lifestyle, Travel, Food, Health, Business, and more.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/allblog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Blogs | Explore Our Blog',
    description: 'Discover the latest articles, insights, and stories from our expert writers.',
  },
};


export default function BlogPage() {
  return <AllBlog/>;
}
