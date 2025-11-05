import type { Metadata } from "next";
import AchievementsClient from "./AchievementsClient";
import AchievementsStructuredData from "../../components/structured-data/AchievementsStructuredData";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Explore my hackathon wins and achievements. I've won 10 hackathons building decentralized platforms in fintech, AI, and edtech. Featured hackathons include Hacker House Goa, Celo, Arbitrum, and more.",
  keywords: ["Hackathons", "Achievements", "Awards", "Web3 Hackathons", "Blockchain Competitions", "Developer Awards", "Celo", "Arbitrum", "Ethereum"],
  openGraph: {
    title: "Achievements | Manobendra Mandal",
    description: "Explore my hackathon wins and achievements. I've won 10 hackathons building decentralized platforms in fintech, AI, and edtech.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/achievements`,
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "Manobendra Mandal - Achievements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements | Manobendra Mandal",
    description: "Explore my hackathon wins and achievements. I've won 10 hackathons building decentralized platforms.",
    images: ["/avatar.png"],
  },
};

export default function AchievementsPage() {
  return (
    <>
      <AchievementsStructuredData />
      <AchievementsClient />
    </>
  );
}
