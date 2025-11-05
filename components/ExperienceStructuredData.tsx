import { mockPortfolioData } from "@/data/mockData";

/**
 * Experience Page Structured Data (JSON-LD)
 * Adds schema.org structured data for work experience
 */

export default function ExperienceStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const personalInfo = mockPortfolioData.personalInfo;
  const experiences = mockPortfolioData.experience;

  // Person with Work History Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "jobTitle": personalInfo.title,
    "worksFor": experiences.map((exp) => ({
      "@type": "Organization",
      "name": exp.company,
      "url": exp.websiteUrl || undefined,
    })),
  };

  // ItemList Schema for Experience
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Work Experience",
    "description": "Professional work experience and roles",
    "url": `${baseUrl}/experience`,
    "itemListElement": experiences.map((exp, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "OrganizationRole",
        "roleName": exp.role,
        "startDate": exp.startDate,
        "endDate": exp.endDate || undefined,
        "worksFor": {
          "@type": "Organization",
          "name": exp.company,
          "url": exp.websiteUrl || undefined,
        },
        "description": exp.responsibilities.join(" "),
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

