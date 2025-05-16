'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/ok');
        const data = await res.json();
        setPosts(data.posts);
        // Initialize formData with titles and content for each post
        setFormData(data.posts.map(post => ({
          blogId: post._id,
          title: post.title,
          content: post.content,
        })));
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const handleSubmit = async (e, index) => {
    e.preventDefault();
    const data = formData[index];

    try {
      const res = await axios.put('/api/change', {
        title: data.title,
        content: data.content,
        blogId: data.blogId,
        images: data.images
      });
      console.log("Updated:", res.data);
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {posts.length > 0 &&
        posts.map((item, index) => (
          <div key={item._id} className="border p-6 rounded-lg shadow">
            <form onSubmit={(e) => handleSubmit(e, index)} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Title</label>
                <Input
                  name="title"
                  value={formData[index]?.title || ''}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Content</label>
                <Input
                  name="content"
                  value={formData[index]?.content || ''}
                  onChange={(e) => handleChange(index, 'content', e.target.value)}
                />
              </div>

              <Input type="hidden" name="blogId" value={item._id} />

              <div className="flex flex-wrap gap-4 mt-4">
                {item.images.map((src) => (
                  <Image
                    src={src}
                    alt="Blog Image"
                    key={src}
                    width={200}
                    height={200}
                    className="rounded shadow"
                  />
                ))}
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </div>
        ))}
    </div>
  );
};

export default Page;
