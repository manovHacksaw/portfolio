import { mockPortfolioData } from "@/data/mockData";

/**
 * Structured Data (JSON-LD) Component
 * Adds schema.org structured data for better SEO and rich snippets
 */

export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const personalInfo = mockPortfolioData.personalInfo;
  const githubLink = mockPortfolioData.portfolioLinks.find(link => link.platform === 'GitHub');
  const linkedInLink = mockPortfolioData.portfolioLinks.find(link => link.platform === 'LinkedIn');
  const featuredProjects = mockPortfolioData.projects.filter(p => p.featured).slice(0, 3);

  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "jobTitle": personalInfo.title,
    "description": personalInfo.bio,
    "email": personalInfo.email,
    "image": `${baseUrl}${personalInfo.avatarUrl}`,
    "url": baseUrl,
    "sameAs": [
      githubLink?.url,
      linkedInLink?.url,
    ].filter(Boolean),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": personalInfo.location,
    },
    "knowsAbout": mockPortfolioData.skills.map(skill => skill.name),
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${personalInfo.name} Portfolio`,
    "url": baseUrl,
    "description": personalInfo.bio,
    "author": {
      "@type": "Person",
      "name": personalInfo.name,
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // BreadcrumbList Schema (for navigation)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": `${baseUrl}/projects`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Experience",
        "item": `${baseUrl}/experience`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Achievements",
        "item": `${baseUrl}/achievements`,
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Contact",
        "item": `${baseUrl}/contact`,
      },
    ],
  };

  // ProfilePage Schema
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": `${personalInfo.name} - Portfolio`,
    "url": baseUrl,
    "mainEntity": {
      "@type": "Person",
      "name": personalInfo.name,
      "jobTitle": personalInfo.title,
      "image": `${baseUrl}${personalInfo.avatarUrl}`,
    },
  };

  // Professional Experience Schema
  const experienceSchemas = mockPortfolioData.experience.map((exp) => ({
    "@context": "https://schema.org",
    "@type": "OrganizationRole",
    "roleName": exp.role,
    "startDate": exp.startDate,
    "endDate": exp.endDate || undefined,
    "worksFor": {
      "@type": "Organization",
      "name": exp.company,
      "url": exp.websiteUrl || undefined,
    },
  }));

  // Award/Achievement Schema (for hackathons)
  const awardSchemas = mockPortfolioData.hackathons
    .filter(h => h.achievement && h.achievement !== 'Bonus Project')
    .slice(0, 5)
    .map((hackathon) => ({
      "@context": "https://schema.org",
      "@type": "Award",
      "name": hackathon.achievement,
      "awardedFor": hackathon.projectName || hackathon.name,
      "description": hackathon.description,
      "dateReceived": hackathon.date,
    }));

  // Collection of schemas
  const schemas = [
    personSchema,
    websiteSchema,
    breadcrumbSchema,
    profilePageSchema,
    ...experienceSchemas,
    ...awardSchemas,
  ];

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

