import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my portfolio of blockchain and full-stack projects. Built with Next.js, React, Solidity, and modern web technologies. Featured projects include decentralized platforms, fintech solutions, and AI-powered applications.",
  keywords: ["Projects", "Portfolio", "Web3 Projects", "Blockchain Development", "Full Stack Projects", "Next.js", "React", "Solidity", "Decentralized Applications"],
  openGraph: {
    title: "Projects | Manobendra Mandal",
    description: "Explore my portfolio of blockchain and full-stack projects. Built with Next.js, React, Solidity, and modern web technologies.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/projects`,
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "Manobendra Mandal - Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Manobendra Mandal",
    description: "Explore my portfolio of blockchain and full-stack projects.",
    images: ["/avatar.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
