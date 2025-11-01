import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

export default function EducationPage() {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      <main className="w-full px-5 py-8">
        <div className="flex flex-col gap-6">
          {/* Education Timeline */}
          <div className="relative pl-8">
            {/* Vertical Timeline Line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-black dark:bg-white opacity-30" />
            
            {mockPortfolioData.education.map((education, index) => (
              <div
                key={education.id}
                className="relative mb-8 last:mb-0"
              >
                {/* Circular Badge on Timeline */}
                <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-black dark:bg-white border-2 border-black dark:border-white z-10">
                  <GraduationCap size={14} className="text-white dark:text-black" />
                </div>

                {/* Content */}
                <div className="ml-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-sm sm:text-base font-bold text-black dark:text-white">
                      {education.institution}
                    </h2>
                    <p className="text-xs sm:text-sm text-black dark:text-white font-light">
                      {education.degree}
                    </p>
                  </div>
                  <div className="text-xs sm:text-sm text-black dark:text-white font-light shrink-0">
                    {education.startYear} - {education.endYear}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote Section */}
          <div className="mt-8 flex flex-col gap-2">
            <p className="text-xs sm:text-sm text-black dark:text-white font-light italic">
              "The best time to repair the roof is when the sun is shining."
            </p>
            <span className="text-xs sm:text-sm text-green-500 border border-green-500 px-2 py-1 w-fit">
              — John F. Kennedy
            </span>
          </div>
        </div>
      </main>
      <BottomNav activeItem="education" />
    </div>
  );
}

