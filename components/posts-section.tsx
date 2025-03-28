"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

const posts = [
  {
    id: 1,
    title: "The Future of Sustainable Trucking",
    excerpt: "Exploring eco-friendly solutions and technologies that are transforming the trucking industry.",
    category: "Industry Trends",
    author: "Michael Johnson",
    date: "May 15, 2023",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Navigating Supply Chain Challenges in 2023",
    excerpt: "Strategies for overcoming the most pressing logistics challenges facing businesses today.",
    category: "Logistics",
    author: "Sarah Williams",
    date: "April 28, 2023",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "How AI is Revolutionizing Route Optimization",
    excerpt: "Artificial intelligence is changing how trucking companies plan routes and improve efficiency.",
    category: "Technology",
    author: "David Chen",
    date: "April 10, 2023",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "The Impact of New Regulations on Trucking Operations",
    excerpt:
      "Understanding how recent regulatory changes affect your logistics operations and compliance requirements.",
    category: "Regulations",
    author: "Jennifer Lopez",
    date: "March 22, 2023",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Best Practices for Temperature-Controlled Shipping",
    excerpt: "Expert tips for maintaining product integrity during refrigerated and frozen goods transportation.",
    category: "Best Practices",
    author: "Robert Smith",
    date: "March 5, 2023",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "Reducing Carbon Footprint in Logistics Operations",
    excerpt: "Practical steps for trucking companies to minimize environmental impact while maintaining efficiency.",
    category: "Sustainability",
    author: "Emily Wilson",
    date: "February 18, 2023",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function PostsSection() {
  const [visiblePosts, setVisiblePosts] = useState(3)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const loadMorePosts = () => {
    setVisiblePosts(Math.min(visiblePosts + 3, posts.length))
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="posts" className="py-16 md:py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Industry Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, trends, and insights from the trucking and logistics industry.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {posts.slice(0, visiblePosts).map((post) => (
            <motion.div key={post.id} variants={item}>
              <Card
                className={`h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 ${
                  isDark ? "hover:shadow-primary/10 border-primary/10" : ""
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className={`${
                        isDark
                          ? "bg-primary/90 text-primary-foreground hover:bg-primary"
                          : "bg-primary/90 text-primary-foreground hover:bg-primary"
                      }`}
                    >
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm mt-2 flex items-center gap-2">
                    <User className="h-3 w-3" />
                    {post.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow-0">
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter
                  className={`flex justify-between items-center border-t pt-4 mt-auto ${
                    isDark ? "border-primary/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {visiblePosts < posts.length && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={loadMorePosts}
              variant="outline"
              className={`group ${isDark ? "border-primary/20 hover:border-primary/50" : ""}`}
            >
              Load More Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

