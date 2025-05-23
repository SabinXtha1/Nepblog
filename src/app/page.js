"use client";

import React, { useEffect, useState } from "react";
import BlogHero from "@/components/Hero";
import Home from "../components/home";
import CarsBlogSkeleton from "../components/CardBlogSkeleton";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api");
      if (!res.ok) throw new Error("Failed to fetch data");

      const json = await res.json();
      console.log(json);
      setData(json.posts || []);
    } catch (er) {
      console.log(er);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <BlogHero data={data || []} loading={loading} />

      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Latest Articles</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our most recent blog posts on technology, design, and development.
              </p>
            </div>
          </div>

          {loading ? <CarsBlogSkeleton /> : <Home data={data} />}
        </div>
      </section>
    </div>
  );
};

export default Page;
