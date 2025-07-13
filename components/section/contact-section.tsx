"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import {
  spaceGrotesk,
  firaSans,
  poppins,
  jetbrainsMono,
  rubik,
  workSans,
} from "@/app/fonts";

interface ContactSectionProps {
  theme: string;
}

export default function ContactSection({ theme }: ContactSectionProps) {
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/manovHacksaw",
      username: "@manovHacksaw",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/manob-mandal/",
      username: "@manob-mandal",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/manovmandal",
      username: "@manovmandal",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:manovmandal@gmail.com",
      username: "manovmandal@gmail.com",
    },
  ];

  return (
    <section
      id="contact"
      // CHANGE: Responsive padding for the section
      className={`py-16 sm:py-20 px-4 sm:px-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-dark" : "bg-gray-50"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* CHANGE: Responsive margin */}
        <div className="mb-12 md:mb-16">
          <h2
            // The text-sizing is already responsive, which is great.
            className={`text-3xl md:text-4xl font-bold mb-4 sm:mb-6 ${spaceGrotesk.className} transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Let's Connect
          </h2>
          <div className="divider-accent mx-auto" />
        </div>

        <div className="mb-10 sm:mb-12">
          <p
            // CHANGE: Responsive font size for better mobile reading
            className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${firaSans.className} transition-colors duration-300 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            I'm always interested in connecting with fellow developers,
            blockchain enthusiasts, and innovators. Whether you have a project
            in mind or just want to chat about technology, I'd love to hear from
            you.
          </p>
        </div>

        {/* The grid defaults to a single column, which is perfect for mobile. */}
        {/* CHANGE: Responsive gap for the grid */}
        <div className="grid  grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                // p-6 works well on both mobile and desktop cards
                className={`group rounded-xl p-6 border shadow-sm transition-all duration-300 ${
                  theme === "dark"
                    ? "card-dark card-hover-dark shadow-dark"
                    : "card-light card-hover-light shadow-light"
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={`p-2 sm:p-3 rounded-full transition-smooth ${
                      theme === "dark"
                        ? "bg-dark-soft group-hover:bg-accent-primary/20"
                        : "bg-pink-50 group-hover:bg-pink-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 accent-primary" />
                  </div>
                  <div>
                    <h3
                      className={`text-sm sm:text-base font-semibold ${poppins.className} transition-smooth ${
                        theme === "dark"
                          ? "text-light group-hover:accent-primary"
                          : "text-dark group-hover:accent-primary"
                      }`}
                    >
                      {link.label}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm ${jetbrainsMono.className} transition-smooth ${
                        theme === "dark"
                          ? "text-muted-light"
                          : "text-muted-dark"
                      }`}
                    >
                      {link.username}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div
          // CHANGE: Responsive padding for the final CTA box
          className={`rounded-xl p-6 md:p-8 border shadow-sm transition-colors duration-300 ${
            theme === "dark"
              ? "card-dark shadow-dark"
              : "card-light shadow-light"
          }`}
        >
          <h3
            className={`text-lg sm:text-xl font-semibold mb-4 ${poppins.className} transition-smooth ${
              theme === "dark" ? "text-light" : "text-dark"
            }`}
          >
            Open to Opportunities
          </h3>
          <p
            className={`mb-6 text-base ${firaSans.className} transition-colors duration-300 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Currently exploring new opportunities in web development,
            blockchain, and innovative tech projects.
          </p>
          <a
            href="mailto:manovmandal@gmail.com"
            className={`inline-flex items-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-lg font-medium ${rubik.className} hover:bg-pink-700 transition-colors duration-300`}
          >
            <Mail size={16} />
            <span>Get in touch</span>
          </a>
        </div>
      </div>
    </section>
  );
}