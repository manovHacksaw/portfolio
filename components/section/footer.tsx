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
          ? "bg-[#121212] border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p
          className={`${workSans.className} text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Crafted with 🔥 using Next.js, Tailwind CSS & good coffee. Deployed to the edge. <br />
          <span className="inline-block mt-2 opacity-80">
            © 2025 Manobendra Mandal — Staying weird on the blockchain.
          </span>
        </p>
      </div>
    </footer>
  );
}
