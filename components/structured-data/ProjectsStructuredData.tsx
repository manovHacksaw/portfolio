import { mockPortfolioData } from "@/data/mockData";

/**
 * Projects Page Structured Data (JSON-LD)
 * Adds schema.org structured data for projects/portfolio
 */

export default function ProjectsStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const personalInfo = mockPortfolioData.personalInfo;
  const projects = mockPortfolioData.projects;

  // ItemList Schema for Projects
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Portfolio Projects",
    "description": "Collection of blockchain and full-stack development projects",
    "url": `${baseUrl}/projects`,
    "itemListElement": projects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.longDescription || project.description,
        "image": `${baseUrl}${project.imageUrl}`,
        "url": project.liveUrl || `${baseUrl}/projects`,
        "applicationCategory": "WebApplication",
        "operatingSystem": "Web",
        "author": {
          "@type": "Person",
          "name": personalInfo.name,
        },
        "keywords": project.technologies.join(", "),
      },
    })),
  };

  // CollectionPage Schema
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Projects | Manobendra Mandal",
    "url": `${baseUrl}/projects`,
    "description": "Explore my portfolio of blockchain and full-stack projects",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": projects.length,
    },
  };

  const schemas = [itemListSchema, collectionPageSchema];

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

