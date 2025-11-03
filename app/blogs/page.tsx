"use client";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { FileText, ExternalLink, Calendar, Clock } from "lucide-react";
import Link from "next/link";

// Mock blog data - replace with actual data source later
const mockBlogs = [
  {
    id: '1',
    title: 'Building Scalable Web3 Applications',
    excerpt: 'Learn how to architect and build decentralized applications that can handle millions of users while maintaining security and performance.',
    date: 'Oct 15, 2024',
    readTime: '5 min read',
    category: 'Web3',
    url: '#',
  },
  {
    id: '2',
    title: 'Mastering Next.js 14 App Router',
    excerpt: 'A deep dive into the latest features of Next.js 14, including Server Components, Streaming, and advanced routing patterns.',
    date: 'Sep 28, 2024',
    readTime: '8 min read',
    category: 'Frontend',
    url: '#',
  },
  {
    id: '3',
    title: 'Smart Contract Security Best Practices',
    excerpt: 'Essential security patterns and common vulnerabilities to avoid when writing Solidity smart contracts for production.',
    date: 'Aug 22, 2024',
    readTime: '6 min read',
    category: 'Blockchain',
    url: '#',
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-[var(--background)]">
      <Header />
      <main className="w-full px-5 lg:px-0 py-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <FileText className="w-6 h-6 text-[var(--nav-accent)]" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)]">
                Blog
              </h1>
            </div>
            <p className="text-sm sm:text-base text-[var(--foreground-muted)] font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Thoughts, tutorials, and insights on web development, blockchain, and building products that matter.
            </p>
          </div>

          {/* Blog Posts List */}
          <div className="flex flex-col gap-6">
            {mockBlogs.map((blog) => (
              <article
                key={blog.id}
                className="group relative overflow-hidden rounded-xl border border-[var(--foreground-border)] bg-[var(--background)] p-6 transition-all duration-300 hover:border-[var(--foreground)] hover:shadow-lg"
              >
                <Link
                  href={blog.url}
                  className="block"
                >
                  {/* Content */}
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] font-medium px-2 py-1 rounded border border-[var(--foreground-border)]">
                          {blog.category}
                        </span>
                        <ExternalLink 
                          size={16} 
                          className="text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors shrink-0" 
                        />
                      </div>
                      
                      <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--nav-accent)] transition-colors">
                        {blog.title}
                      </h2>
                    </div>

                    {/* Excerpt */}
                    <p className="text-sm sm:text-base text-[var(--foreground-muted)] font-light leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-[var(--foreground-muted)] font-light">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Empty State Message */}
          {mockBlogs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-[var(--foreground-muted)] mx-auto mb-4 opacity-50" />
              <p className="text-sm text-[var(--foreground-muted)] font-light">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
      <BottomNav activeItem="blogs" />
    </div>
  );
}

