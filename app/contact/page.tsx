import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import ContactStructuredData from "../../components/structured-data/ContactStructuredData";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's work together! Get in touch with Manobendra Mandal for collaborations, project inquiries, or just to say hello. Available for blockchain development, full-stack projects, and hackathon collaborations.",
  keywords: ["Contact", "Get in Touch", "Collaboration", "Hire Developer", "Blockchain Developer", "Full Stack Developer", "Web3 Developer", "Portfolio Contact"],
  openGraph: {
    title: "Contact | Manobendra Mandal",
    description: "Let's work together! Get in touch for collaborations, project inquiries, or just to say hello.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/contact`,
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "Manobendra Mandal - Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Manobendra Mandal",
    description: "Let's work together! Get in touch for collaborations and project inquiries.",
    images: ["/avatar.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactStructuredData />
      <ContactClient />
    </>
  );
}
