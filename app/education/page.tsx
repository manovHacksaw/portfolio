"use client";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { MapPin, Calendar } from "lucide-react";
import Image from "next/image";

export default function EducationPage() {
  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-[var(--background)]">
      <Header />
      <main className="w-full px-5 py-6">
        <div className="flex flex-col gap-6">
          {/* Education List */}
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {mockPortfolioData.education.map((education, index) => (
              <motion.div
                key={education.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)] hover:opacity-80 transition-opacity"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                  },
                }}
                whileHover={{
                  x: 4,
                  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                }}
              >
                {/* Institution Logo */}
                {education.imageUrl && (
                  <div className="relative w-14 h-14 sm:w-12 sm:h-12 shrink-0 rounded-full overflow-hidden bg-[var(--background)]">
                    <Image
                      src={education.imageUrl}
                      alt={education.institution}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                    <div className="flex flex-col gap-0.5">
                      <h2 className="text-base sm:text-sm font-bold text-[var(--foreground)]">
                        {education.institution}
                      </h2>
                      <p className="text-xs sm:text-xs text-[var(--foreground)] font-light">
                        {education.degree}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-xs text-[var(--foreground-muted)] font-light shrink-0">
                      <Calendar size={12} className="sm:w-[10px] sm:h-[10px]" />
                      <span>{education.startYear ? `${education.startYear} - ${education.endYear}` : education.endYear}</span>
                    </div>
                  </div>

                  {/* Location */}
                  {education.location && (
                    <div className="flex items-center gap-1.5 text-xs sm:text-xs text-[var(--foreground-muted)] font-light">
                      <MapPin size={12} className="sm:w-[10px] sm:h-[10px]" />
                      <span>{education.location}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote Section */}
          {mockPortfolioData.educationPage?.quote && (
            <motion.div
              className="mt-6 flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.p
                className="text-sm sm:text-sm text-[var(--foreground)] font-light italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                "{mockPortfolioData.educationPage.quote.text}"
              </motion.p>
              <motion.span
                className="text-sm sm:text-sm px-2 py-1 w-fit rounded"
                style={{ color: 'var(--nav-accent)', borderColor: 'var(--nav-accent)', borderWidth: '1px', borderStyle: 'solid' }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {mockPortfolioData.educationPage.quote.attribution}
              </motion.span>
            </motion.div>
          )}
        </div>
      </main>
      <BottomNav activeItem="education" />
    </div>
  );
}
