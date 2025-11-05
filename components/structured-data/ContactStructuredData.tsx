import { mockPortfolioData } from "@/data/mockData";

/**
 * Contact Page Structured Data (JSON-LD)
 * Adds schema.org structured data for contact information
 */

export default function ContactStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const personalInfo = mockPortfolioData.personalInfo;
  const githubLink = mockPortfolioData.portfolioLinks.find(link => link.platform === 'GitHub');
  const linkedInLink = mockPortfolioData.portfolioLinks.find(link => link.platform === 'LinkedIn');

  // ContactPage Schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact | Manobendra Mandal",
    "url": `${baseUrl}/contact`,
    "description": "Get in touch with Manobendra Mandal for collaborations, project inquiries, or just to say hello.",
    "mainEntity": {
      "@type": "Person",
      "name": personalInfo.name,
      "email": personalInfo.email,
      "jobTitle": personalInfo.title,
      "url": baseUrl,
      "sameAs": [
        githubLink?.url,
        linkedInLink?.url,
      ].filter(Boolean),
      "address": {
        "@type": "PostalAddress",
        "addressLocality": personalInfo.location,
      },
    },
  };

  // Person Schema with Contact Information
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "email": personalInfo.email,
    "url": baseUrl,
    "sameAs": [
      githubLink?.url,
      linkedInLink?.url,
    ].filter(Boolean),
  };

  const schemas = [contactPageSchema, personSchema];

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

