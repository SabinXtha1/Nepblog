"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formState)
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Get in Touch
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a question or want to collaborate? Reach out using the form
          below or through our social channels.
        </p>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          
        >
          <form onSubmit={handleSubmit} className="space-y-6 mb-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                name="name"
                placeholder="Your name"
                value={formState.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Your email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
            <Input
              name="subject"
              placeholder="Subject"
              value={formState.subject}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your message"
              className="min-h-[150px]"
              value={formState.message}
              onChange={handleChange}
              required
            />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </form>
           {/* Social Media Links */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Follow Us</CardTitle>
                <CardDescription>Stay connected online</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {[{
                    href: "https://x.com/xtha__sabin",
                    icon: <Twitter className="h-5 w-5" />,
                    label: "Twitter",
                  },
                  {
                    href: "https://www.linkedin.com/in/sabin-nayaju-72438a204/",
                    icon: <Linkedin className="h-5 w-5" />,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://github.com/SabinXtha1",
                    icon: <Github className="h-5 w-5" />,
                    label: "GitHub",
                  },
                  {
                    href: "https://www.instagram.com/xtha__sabin/",
                    icon: <Instagram className="h-5 w-5" />,
                    label: "Instagram",
                  }].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition"
                    >
                      {social.icon}
                      <span className="sr-only">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Contact & Social Info */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Contact Info */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Contact Information</CardTitle>
                <CardDescription>
                  Reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      hello@bloginsights.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-sm text-muted-foreground">
                      123 Blog Street, Suite 101
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

         
        </motion.div>
        
      </div>
    </div>
  )
}
