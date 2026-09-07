import { Hackathon } from "@/types/portfolio.types";

export interface GroupedHackathon {
  name: string;
  date: string;
  location?: string;
  logoUrl?: string;
  projects: Hackathon[];
}

const MONTH_ORDER = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseDate(dateStr: string) {
  if (dateStr.includes(' - ')) {
    const parts = dateStr.split(' - ');
    const endDate = parts[1].trim();
    const endParts = endDate.split(' ');

    let month = '';
    let year = '';

    for (const part of endParts) {
      if (MONTH_ORDER.includes(part)) {
        month = part;
      } else if (!isNaN(parseInt(part)) && part.length === 4) {
        year = part;
      }
    }

    if (!month && endParts.length >= 3) {
      month = endParts[1];
      year = endParts[2];
    }

    const monthIndex = MONTH_ORDER.indexOf(month);
    return { year: parseInt(year) || 0, monthIndex: monthIndex >= 0 ? monthIndex : 0 };
  }

  const parts = dateStr.trim().split(' ');
  let month = '';
  let year = '';

  for (const part of parts) {
    if (MONTH_ORDER.includes(part)) {
      month = part;
    } else if (!isNaN(parseInt(part)) && part.length === 4) {
      year = part;
    }
  }

  const monthIndex = MONTH_ORDER.indexOf(month);
  return { year: parseInt(year) || 0, monthIndex: monthIndex >= 0 ? monthIndex : 0 };
}

/**
 * Groups hackathon entries by name+date (a single hackathon can have several
 * project rows) and sorts groups reverse-chronologically. Shared by the full
 * /achievements page and the home page preview.
 */
export function groupHackathons(hackathons: Hackathon[]): GroupedHackathon[] {
  const groups = new Map<string, GroupedHackathon>();

  hackathons.forEach((hackathon) => {
    const key = `${hackathon.name}_${hackathon.date}`;
    if (!groups.has(key)) {
      groups.set(key, {
        name: hackathon.name,
        date: hackathon.date,
        location: hackathon.location,
        logoUrl: hackathon.logoUrl,
        projects: [],
      });
    }
    groups.get(key)!.projects.push(hackathon);
  });

  return Array.from(groups.values()).sort((a, b) => {
    const aDate = parseDate(a.date);
    const bDate = parseDate(b.date);

    if (aDate.year !== bDate.year) return bDate.year - aDate.year;
    if (aDate.monthIndex !== bDate.monthIndex) return bDate.monthIndex - aDate.monthIndex;
    return 0;
  });
}
