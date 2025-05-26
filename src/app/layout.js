import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata for SEO and social sharing
export const metadata = {
  title: "NepBlog – AI Powered Blog Platform from Nepal",
  description:
    "NepBlog is an AI-powered blog platform where you can read, create, and share intelligent blogs. Let AI write for you or express yourself in your own words.",
  keywords: [
    "NepBlog",
    "AI blog generator",
    "Nepali blog platform",
    "blog with AI",
    "create blog with AI",
    "Nepal tech blog",
    "automatic blog creation",
    "AI blogging website",
    "Nepali blogging site",
    "write blog using AI",
  ],
  authors: [{ name: "NepBlog Team", url: "https://nepblog.vercel.app" }],
  creator: "NepBlog AI",
  openGraph: {
    title: "NepBlog – AI Powered Blogging Platform",
    description:
      "Write or generate blogs using AI. Share your thoughts or let AI help you tell your story on NepBlog.",
    url: "https://nepblog.vercel.app",
    siteName: "NepBlog",
    images: [
      {
        url: "https://nepblog.vercel.app/default-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NepBlog - Write or Generate Blogs with AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NepBlog – AI-Powered Blog Platform",
    description:
      "Generate blogs with AI or create your own posts. Discover and share ideas on NepBlog.",
    site: "@nepblog",
    creator: "@nepblog",
    images: ["https://nepblog.vercel.app/default-og-image.jpg"],
  },
  metadataBase: new URL("https://nepblog.vercel.app"),
  themeColor: "#0ea5e9",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4156883720393070"
     crossorigin="anonymous"></script>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <ToastContainer />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
