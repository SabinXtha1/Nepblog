"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Twitter, Instagram, Linkedin, Mail, Phone, ArrowRight, Heart } from "lucide-react"

export default function ModernFooter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const linkVariants = {
    initial: { x: 0 },
    hover: { x: 5, transition: { type: "spring", stiffness: 400, damping: 10 } },
  }

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, transition: { type: "spring", stiffness: 400, damping: 10 } },
  }

  return (
    <footer className="bg-black text-gray-100 border-t pt-10">
      <motion.div
        className="container mx-auto px-4 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h3
              className="text-xl font-bold text-white"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Company
            </motion.h3>
            <p className="text-gray-300 max-w-xs">Building better experiences.</p>
            <div className="flex space-x-4 pt-2">
              <motion.a
                href="https://github.com/SabinXtha1"
                target="_blank"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className="text-gray-400 hover:text-white transition-colors"
                rel="noreferrer"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="https://x.com/xtha__sabin"
                target="_blank"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className="text-gray-400 hover:text-white transition-colors"
                rel="noreferrer"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/xtha__sabin/"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/sabin-nayaju-72438a204/"
                target="_blank"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className="text-gray-400 hover:text-white transition-colors"
                rel="noreferrer"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Contact", path: "/contact" },
                { name: "Blogs", path: "/allblog" },
              ].map((item, key) => (
                <motion.li key={key}>
                  <motion.div variants={linkVariants} initial="initial" whileHover="hover">
                    <Link href={item.path} className="text-gray-300 hover:text-white flex items-center group">
                      <span>{item.name}</span>
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ArrowRight size={14} className="ml-1 inline-block" />
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gray-400" />
                <span className="text-gray-300">+977 578-6687</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-400" />
                <span className="text-gray-300">pdfyn@gmail.org</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Stay Connected</h3>
              <p className="text-gray-300 text-sm">Get updates on our latest features and news</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-zinc-900 text-white px-4 py-3 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border border-zinc-700"
                  />
                </div>
                <motion.button
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md sm:rounded-l-none text-white font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-zinc-500 text-xs mt-2">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-500">
          <p>
            © {new Date().getFullYear()} PDFYN. All rights reserved. Made with {"Love"}
            <motion.span
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 0.6 }}
              className="inline-block text-purple-500"
            >
              <Heart size={14} className="inline" />
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}