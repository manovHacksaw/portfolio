"use client";

interface BlogSectionProps {
  theme: string;
}

export default function BlogSection({ theme }: BlogSectionProps) {
  return (
    <section
      id="blog"
      className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 transition-smooth ${
        theme === "dark" ? "bg-dark-soft" : "bg-light-soft"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 transition-smooth ${
              theme === "dark" ? "text-light" : "text-dark"
            }`}
          >
            Latest Blog Posts
          </h2>
          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto transition-smooth ${
              theme === "dark" ? "text-muted-light" : "text-muted-dark"
            }`}
          >
            Coming soon...
          </p>
        </div>
      </div>
    </section>
  );
}
