"use client";

import { workSans } from "@/app/fonts";

interface FooterProps {
  theme: string;
}

export default function Footer({ theme }: FooterProps) {
  return (
    <footer
      className={`border-t py-8 px-6 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-950 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p
          className={`${workSans.className} transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          © 2024 Manobendra Mandal. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
