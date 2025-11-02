import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { MapPin, Calendar } from "lucide-react";
import Image from "next/image";

export default function EducationPage() {
  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-black">
      <Header />
      <main className="w-full px-5 py-8">
        <div className="flex flex-col gap-8">
          {/* Education List */}
          <div className="flex flex-col gap-6">
            {mockPortfolioData.education.map((education, index) => (
              <div
                key={education.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-black hover:opacity-80 transition-opacity"
              >
                {/* Institution Logo */}
                {education.imageUrl && (
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full overflow-hidden bg-white dark:bg-black">
                    <Image
                      src={education.imageUrl}
                      alt={education.institution}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-xs sm:text-sm font-bold text-black dark:text-white">
                        {education.institution}
                      </h2>
                      <p className="text-[10px] sm:text-xs text-black dark:text-white font-light">
                        {education.degree}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-light shrink-0">
                      <Calendar size={10} />
                      <span>{education.startYear ? `${education.startYear} - ${education.endYear}` : education.endYear}</span>
                    </div>
                  </div>

                  {/* Location */}
                  {education.location && (
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-light">
                      <MapPin size={10} />
                      <span>{education.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quote Section */}
          <div className="mt-8 flex flex-col gap-2">
            <p className="text-xs sm:text-sm text-black dark:text-white font-light italic">
              "The best time to repair the roof is when the sun is shining."
            </p>
            <span className="text-xs sm:text-sm text-green-500 border border-green-500 px-2 py-1 w-fit rounded">
              — John F. Kennedy
            </span>
          </div>
        </div>
      </main>
      <BottomNav activeItem="education" />
    </div>
  );
}
