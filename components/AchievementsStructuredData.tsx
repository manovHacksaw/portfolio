import { mockPortfolioData } from "@/data/mockData";

/**
 * Achievements Page Structured Data (JSON-LD)
 * Adds schema.org structured data for hackathons and achievements
 */

export default function AchievementsStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const personalInfo = mockPortfolioData.personalInfo;
  const hackathons = mockPortfolioData.hackathons;

  // ItemList Schema for Hackathons
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hackathon Achievements",
    "description": "Collection of hackathon wins and achievements",
    "url": `${baseUrl}/achievements`,
    "itemListElement": hackathons.map((hackathon, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Event",
        "name": hackathon.name,
        "description": hackathon.description,
        "startDate": hackathon.date,
        "location": {
          "@type": "Place",
          "name": hackathon.location || "Online",
        },
        "award": hackathon.achievement ? {
          "@type": "Award",
          "name": hackathon.achievement,
          "description": hackathon.prize ? `Won ${hackathon.prize}` : undefined,
        } : undefined,
      },
    })),
  };

  // Person with Awards Schema
  const personWithAwardsSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "award": hackathons
      .filter(h => h.achievement && h.achievement !== 'Bonus Project')
      .map(h => h.achievement),
  };

  const schemas = [itemListSchema, personWithAwardsSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

