import type { Metadata } from "next";
import EducationClient from "./EducationClient";
import EducationStructuredData from "../../components/structured-data/EducationStructuredData";

export const metadata: Metadata = {
  title: "Education",
  description: "My educational journey in computer science and software engineering. Explore my academic background, degrees, and continuous learning in blockchain and full-stack development.",
  keywords: ["Education", "Computer Science", "Software Engineering", "Academic Background", "Degrees", "University", "Learning"],
  openGraph: {
    title: "Education | Manobendra Mandal",
    description: "My educational journey in computer science and software engineering.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/education`,
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "Manobendra Mandal - Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education | Manobendra Mandal",
    description: "My educational journey in computer science and software engineering.",
    images: ["/avatar.png"],
  },
};

export default function EducationPage() {
  return (
    <>
      <EducationStructuredData />
      <EducationClient />
    </>
  );
}
