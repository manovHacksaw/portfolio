import { mockPortfolioData } from "@/data/mockData";

/**
 * Education Page Structured Data (JSON-LD)
 * Adds schema.org structured data for educational background
 */

export default function EducationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const personalInfo = mockPortfolioData.personalInfo;
  const education = mockPortfolioData.education;

  // Person with Education Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "alumniOf": education.map((edu) => ({
      "@type": "EducationalOrganization",
      "name": edu.institution,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": edu.location,
      },
    })),
  };

  // ItemList Schema for Education
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Education",
    "description": "Educational background and academic achievements",
    "url": `${baseUrl}/education`,
    "itemListElement": education.map((edu, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": edu.degree,
        "educationalLevel": "Bachelor's Degree",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": edu.institution,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": edu.location,
          },
        },
        "dateCreated": edu.startYear,
        "dateModified": edu.endYear || undefined,
      },
    })),
  };

  const schemas = [personSchema, itemListSchema];

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

