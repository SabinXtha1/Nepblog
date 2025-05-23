"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeaturedPostsSlide from "./HeroFeature";
import { ArrowRight, Sparkles } from "lucide-react";
import SkeletonBlogCard from './GenerateHeroSke';

export default function BlogHero({ data = [], loading }) {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    if (!loading && Array.isArray(data)) {
      const filteredData = data.filter((post) => post.featured === true);
      setFeaturedPosts(filteredData);
    }
  }, [data, loading]);

  return (
    <section className="relative overflow-hidden bg-background flex items-center justify-center flex-col py-20 md:py-32 px-4 lg:px-8 lg:h-[90vh]">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.02]" aria-hidden="true">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-0 h-[1px] w-[300px] -translate-x-1/2 rotate-[30deg] bg-foreground"
            style={{ top: `${i * 15}px`, left: `${(i % 2) * 100 + 500}px` }}
          />
        ))}
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Text Section */}
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI-Powered Blog
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Daily AI-Generated <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Insights & Ideas
                </span>
              </motion.h1>

              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore our blog where AI creates fresh content daily on
                technology, design, and the future of digital experiences.
              </motion.p>
            </div>

            {/* Subscribe Form */}
            <div className="w-full flex justify-start min-[1500px]:px-8">
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex max-w-md">
                  <Input placeholder="Enter your email" type="email" />
                </div>
                <Button className="group transition-all duration-300">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Featured Posts */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!loading && featuredPosts.length > 0 ? (
              <FeaturedPostsSlide filteredDatas={featuredPosts} />
            ) : (
              <SkeletonBlogCard/>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
