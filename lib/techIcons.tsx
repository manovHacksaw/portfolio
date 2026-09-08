import * as Si from "react-icons/si";
import type { IconType } from "react-icons";

// Shared name -> Simple Icons mapping used anywhere a technology name needs
// a matching glyph (currently: the Skills pill wall).
const ICON_MAP: Record<string, IconType> = {
  "Next.js": Si.SiNextdotjs,
  "React.js": Si.SiReact,
  React: Si.SiReact,
  "Tailwind CSS": Si.SiTailwindcss,
  Bootstrap: Si.SiBootstrap,
  "Node.js": Si.SiNodedotjs,
  Express: Si.SiExpress,
  MongoDB: Si.SiMongodb,
  PostgreSQL: Si.SiPostgresql,
  Supabase: Si.SiSupabase,
  Ethereum: Si.SiEthereum,
  Solana: Si.SiSolana,
  Polygon: Si.SiPolygon,
  Celo: Si.SiEthereum,
  "ethers.js": Si.SiEthereum,
  Wagmi: Si.SiWagmi,
  IPFS: Si.SiIpfs,
  "The Graph": Si.SiGraphql,
  Git: Si.SiGit,
  Docker: Si.SiDocker,
  "Socket.io": Si.SiSocketdotio,
  Hardhat: Si.SiEthereum,
  Arcjet: Si.SiArc,
  Inngest: Si.SiCoder,
  Nodemailer: Si.SiNodedotjs,
  "OpenAI API": Si.SiOpenai,
  "Gemini AI": Si.SiGooglegemini,
  C: Si.SiC,
  "C++": Si.SiCplusplus,
  JavaScript: Si.SiJavascript,
  TypeScript: Si.SiTypescript,
  Rust: Si.SiRust,
  Java: Si.SiOpenjdk,
  Solidity: Si.SiSolidity,
  DigitalOcean: Si.SiDigitalocean,
  AWS: Si.SiAmazonwebservices,
  Redis: Si.SiRedis,
  Traefik: Si.SiTraefikproxy,
  Terraform: Si.SiTerraform,
};

export function getTechIcon(name: string): IconType {
  return ICON_MAP[name] ?? Si.SiCoder;
}
