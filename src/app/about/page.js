"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Clock,
  Heart,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center md:text-left mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          About Blog Insights
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">
          Exploring the intersection of technology, design, and human experience
          through thoughtful analysis and expert perspectives.
        </p>
      </motion.div>

      {/* Mission and Vision */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 md:grid-cols-2 mb-12"
      >
        <div className="space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground">
            To provide thoughtful, accessible, and nuanced perspectives on
            technology and its impact on our world. We believe in looking beyond
            the headlines to explore the deeper implications of technological
            change.
          </p>
        </div>
        <div className="space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Our Vision</h2>
          <p className="text-muted-foreground">
            To foster a more informed, thoughtful, and inclusive conversation
            about technology. We envision a world where technological progress
            is guided by human values and serves the needs of all people.
          </p>
        </div>
      </motion.div>

      {/* Core Values Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16"
      >
        {[
          {
            icon: <BookOpen className="h-5 w-5 text-primary" />,
            title: "Depth & Clarity",
            content:
              "We believe in exploring topics thoroughly while making complex ideas accessible to all readers.",
          },
          {
            icon: <Users className="h-5 w-5 text-primary" />,
            title: "Inclusivity",
            content:
              "We strive to represent diverse perspectives and consider the impact of technology on all communities.",
          },
          {
            icon: <Award className="h-5 w-5 text-primary" />,
            title: "Quality",
            content:
              "We're committed to rigorous research, fact-checking, and thoughtful analysis in everything we publish.",
          },
          {
            icon: <Heart className="h-5 w-5 text-primary" />,
            title: "Human-Centered",
            content:
              "We evaluate technology based on how it serves human needs, values, and well-being.",
          },
          {
            icon: <Clock className="h-5 w-5 text-primary" />,
            title: "Forward-Looking",
            content:
              "We aim to anticipate trends and help readers prepare for technological changes ahead.",
          },
        ].map((card, index) => (
          <motion.div key={index} variants={item}>
            <Card>
              <CardHeader>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-2">
                  {card.icon}
                </div>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{card.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-lg bg-muted/50 p-6 sm:p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Have questions about our blog or interested in collaborating?
          We&apos;d love to hear from you.
        </p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all"
        >
          Contact Us
        </motion.a>
      </motion.div>
    </div>
  );
}
