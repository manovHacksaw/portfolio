// TypeScript types/interfaces for portfolio data
// These will match the future database schema

export interface Interest {
  id: string;
  name: string;
  icon: string; // Icon name or identifier
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null; // null means "now" or "present"
  responsibilities: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'language' | 'cloud';
  icon?: string;
  color?: string; // For skill badges/logos
  proficiency?: 'beginner' | 'intermediate' | 'advanced'; // Optional proficiency level
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string | null;
}

export interface PortfolioLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // Optional detailed description
  imageUrl: string;
  technologies: string[]; // Array of skill/technology IDs or names
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean; // For highlighting featured projects
  startDate?: string;
  endDate?: string | null; // null means "present" or "ongoing"
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  age: number;
  email: string;
  location: string;
  locationFlag: string; // Flag emoji or identifier
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  interests: Interest[];
  experience: Experience[];
  skills: Skill[];
  education: Education[];
  projects: Project[];
  portfolioLinks: PortfolioLink[];
}

