// layout.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer"
import {
  ClerkProvider,
 
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'



const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'All Blogs | Explore Our Blog',
  description: 'Discover the latest articles, insights, and stories from our expert writers. Filter blogs by category: Technology, Lifestyle, Travel, Food, Health, Business, and more.',
  openGraph: {
    title: 'All Blogs | Explore Our Blog',
    description: 'Discover the latest articles, insights, and stories from our expert writers. Filter blogs by category: Technology, Lifestyle, Travel, Food, Health, Business, and more.',
    type: 'website',
    url: '/allblog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Blogs | Explore Our Blog',
    description: 'Discover the latest articles, insights, and stories from our expert writers.',
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <ClerkProvider>
        
      <html lang="en" suppressHydrationWarning>
        
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased `} >
               <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                
      <Navbar/>
      <ToastContainer/>
          {children}
               </ThemeProvider>
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  )
}