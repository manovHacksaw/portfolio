"use client";
import { motion } from "framer-motion";
import { Skill } from "@/types/portfolio.types";
import { getTechIcon } from "@/lib/techIcons";
import SectionReveal from "../motion/SectionReveal";
import { fadeUp, stagger } from "../motion/variants";

interface SkillsSectionProps {
  skills: Skill[];
}

// Flat, deduped pill wall — the "tools" category in the data lumps
// Web3/DevOps/AI technologies together and "Next.js" appears twice under
// different categories, so this keeps first-seen order but drops repeats
// and the two spoken-language entries (Hindi/English), which aren't tech.
function dedupedTechSkills(skills: Skill[]): Skill[] {
  const seen = new Set<string>();
  const spokenLanguages = new Set(["Hindi", "English"]);
  const result: Skill[] = [];
  for (const skill of skills) {
    if (spokenLanguages.has(skill.name) || seen.has(skill.name)) continue;
    seen.add(skill.name);
    result.push(skill);
  }
  return result;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const items = dedupedTechSkills(skills);

  return (
    <section className="w-full py-16 sm:py-20">
      <SectionReveal variants={fadeUp} className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          Skills &amp; Technologies
        </h2>
      </SectionReveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.03)}
        className="flex flex-wrap gap-2"
      >
        {items.map((skill) => {
          const Icon = getTechIcon(skill.name);
          return (
            <motion.span
              key={skill.id}
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--foreground-border)] px-3 py-2 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
            >
              <Icon size={15} />
              {skill.name}
            </motion.span>
          );
        })}
      </motion.div>
    </section>
  );
}
