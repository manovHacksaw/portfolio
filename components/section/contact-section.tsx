"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import {
  spaceGrotesk,
  firaSans,
  poppins,
  jetbrainsMono,
  rubik,
} from "@/app/fonts";

interface ContactSectionProps {
  theme: string;
}

export default function ContactSection({ theme }: ContactSectionProps) {
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/manobendra",
      username: "@manobendra",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/manobendra",
      username: "manobendra",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/manobendra",
      username: "@manobendra",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:hello@manobendra.dev",
      username: "hello@manobendra.dev",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-20 px-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${spaceGrotesk.className} transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Let's Connect
          </h2>
          <div className="w-20 h-0.5 bg-pink-500 mx-auto" />
        </div>

        <div className="mb-12">
          <p
            className={`text-lg leading-relaxed max-w-2xl mx-auto ${firaSans.className} transition-colors duration-300 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            I'm always interested in connecting with fellow developers,
            blockchain enthusiasts, and innovators. Whether you have a project
            in mind or just want to chat about technology, I'd love to hear from
            you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-xl p-6 border shadow-sm transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-950 border-gray-700 hover:shadow-lg hover:border-pink-500/50"
                    : "bg-white border-gray-200 hover:shadow-lg hover:border-pink-300"
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={`p-3 rounded-full transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-pink-900/30 group-hover:bg-pink-800/50"
                        : "bg-pink-100 group-hover:bg-pink-200"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${poppins.className} transition-colors duration-300 ${
                        theme === "dark"
                          ? "text-white group-hover:text-pink-400"
                          : "text-gray-900 group-hover:text-pink-500"
                      }`}
                    >
                      {link.label}
                    </h3>
                    <p
                      className={`text-sm ${jetbrainsMono.className} transition-colors duration-300 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
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
          className={`rounded-xl p-8 border shadow-sm transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-950 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h3
            className={`text-xl font-semibold mb-4 ${poppins.className} transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Open to Opportunities
          </h3>
          <p
            className={`mb-6 ${firaSans.className} transition-colors duration-300 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Currently exploring new opportunities in web development,
            blockchain, and innovative tech projects.
          </p>
          <a
            href="mailto:hello@manobendra.dev"
            className={`inline-flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg font-medium ${rubik.className} hover:bg-pink-700 transition-colors duration-300`}
          >
            <Mail size={18} />
            <span>Get in touch</span>
          </a>
        </div>
      </div>
    </section>
  );
}
