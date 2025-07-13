"use client";

import { workSans } from "@/app/fonts";

interface FooterProps {
  theme: string;
}

export default function Footer({ theme }: FooterProps) {
  return (
    <footer
      className={`border-t py-8 px-6 transition-smooth ${
        theme === "dark" ? "bg-dark border-light" : "bg-light border-dark"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p
          className={`${workSans.className} text-sm sm:text-base leading-relaxed transition-smooth ${
            theme === "dark" ? "text-muted-light" : "text-muted-dark"
          }`}
        >
          Crafted with 🔥 using Next.js, Tailwind CSS & good coffee. Deployed to
          the edge. <br />
          <span className="inline-block mt-2 opacity-80">
            © 2025 Manobendra Mandal — Staying weird on the blockchain.
          </span>
        </p>
      </div>
    </footer>
  );
}
