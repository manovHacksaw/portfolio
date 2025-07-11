"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    title: "Building Trustless Inheritance Systems on Blockchain",
    excerpt:
      "Deep dive into creating smart contracts that handle digital asset inheritance without intermediaries. Exploring the challenges and solutions in Legacy on Chain.",
    publishDate: "2024-12-15",
    readTime: "8 min read",
    tags: ["Web3", "Smart Contracts", "Inheritance"],
    slug: "trustless-inheritance-blockchain",
  },
  {
    title: "Liquid Staking: The Future of DeFi Yields",
    excerpt:
      "How liquid staking protocols are revolutionizing the way we think about staking rewards. Lessons learned from building Coro Tashi on Core Chain.",
    publishDate: "2024-11-28",
    readTime: "6 min read",
    tags: ["DeFi", "Staking", "Core Chain"],
    slug: "liquid-staking-defi-future",
  },
  {
    title: "Solving Trust Issues in Remote Work with Web3",
    excerpt:
      "Exploring how blockchain technology can eliminate scams and build trust in the freelance economy. The story behind Fork Work platform.",
    publishDate: "2024-11-10",
    readTime: "10 min read",
    tags: ["Web3", "Freelance", "Trust"],
    slug: "web3-remote-work-trust",
  },
  {
    title: "From Web2 to Web3: A Self-Taught Developer's Journey",
    excerpt:
      "My personal journey of transitioning from traditional web development to blockchain. Challenges, learnings, and key insights for aspiring Web3 developers.",
    publishDate: "2024-10-22",
    readTime: "12 min read",
    tags: ["Career", "Learning", "Web3"],
    slug: "web2-to-web3-journey",
  },
  {
    title: "Hackathon Success: Building Under Pressure",
    excerpt:
      "Strategies and mindset that led to winning multiple hackathons. How to ideate, build, and present winning projects in 48 hours.",
    publishDate: "2024-10-05",
    readTime: "7 min read",
    tags: ["Hackathons", "Strategy", "Building"],
    slug: "hackathon-success-guide",
  },
  {
    title: "The Future of AI + Web3 Integration",
    excerpt:
      "Exploring the intersection of artificial intelligence and blockchain technology. Potential use cases and challenges in building AI-powered dApps.",
    publishDate: "2024-09-18",
    readTime: "9 min read",
    tags: ["AI", "Web3", "Future"],
    slug: "ai-web3-integration-future",
  },
]

export function BlogSection() {
  const openBlogPost = (slug: string) => {
    // In a real implementation, this would navigate to the blog post
    console.log(`Opening blog post: ${slug}`)
  }

  return (
    <div className="py-20 px-6 relative z-10 bg-gradient-to-b from-transparent to-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Latest Blog Posts</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Sharing insights, learnings, and thoughts from my Web3 journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="bg-white/60 backdrop-blur-sm border-white/50 hover:bg-white/80 transition-all duration-300 group hover:shadow-xl hover:shadow-pink-100/50 rounded-2xl cursor-pointer"
              onClick={() => openBlogPost(post.slug)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>

                <CardTitle className="text-slate-800 group-hover:text-pink-500 transition-colors leading-tight">
                  {post.title}
                </CardTitle>

                <CardDescription className="text-slate-600 leading-relaxed">{post.excerpt}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="border-pink-200 text-pink-700 bg-pink-50 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="text-pink-500 hover:text-pink-700 hover:bg-pink-50 p-0 h-auto font-medium group/btn"
                >
                  <span className="flex items-center gap-2">
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
