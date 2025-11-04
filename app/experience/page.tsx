import type { Metadata } from "next";
import ExperienceClient from "./ExperienceClient";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional work experience as a web developer and software engineer. Building scalable applications with Next.js, React, Express, MongoDB, and modern web technologies.",
  keywords: ["Work Experience", "Professional Experience", "Web Developer", "Software Engineer", "Full Stack Developer", "Next.js", "React", "Express", "MongoDB"],
  openGraph: {
    title: "Experience | Manobendra Mandal",
    description: "My professional work experience as a web developer and software engineer. Building scalable applications with modern web technologies.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/experience`,
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "Manobendra Mandal - Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Manobendra Mandal",
    description: "My professional work experience as a web developer and software engineer.",
    images: ["/avatar.png"],
  },
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
