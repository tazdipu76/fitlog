"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Clock, Flame, Star, Check, Trash2 } from "lucide-react";

function MyPlanContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  
  const [activeTab, setActiveTab] = useState<"plan" | "saved">(
    tabParam === "saved" ? "saved" : "plan"
  );
  const [sortBy, setSortBy] = useState("duration");

  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone, metrics } = usePlan();

 
  const currentTab = tabParam === "saved" ? "saved" : activeTab;
  const currentList = currentTab === "plan" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
      <h1 className="text-4xl font-oswald font-bold mb-2">MY PLAN</h1>
      <p className="text-gray-400 text-sm md:text-base mb-6">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics Summary */}
      <div className="bg-[#12141a] text-white rounded-2xl p-6 mb-8 grid grid-cols-3 divide-x divide-gray-800 border border-gray-800">
        <div className="flex flex-col justify-center pr-4">
          <span className="text-gray-400 text-xs md:text-sm">Exercises</span>
          <span className="text-3xl md:text-5xl font-black font-oswald text-[#ccff00]">
            {metrics.exercises}
          </span>
        </div>
        <div className="flex flex-col justify-center px-4 md:px-8">
          <span className="text-gray-400 text-xs md:text-sm">Minutes</span>
          <span className="text-3xl md:text-5xl font-black font-oswald">{metrics.minutes}</span>
        </div>
        <div className="flex flex-col justify-center pl-4 md:pl-8">
          <span className="text-gray-400 text-xs md:text-sm">Calories</span>
          <span className="text-3xl md:text-5xl font-black font-oswald">{metrics.calories}</span>
        </div>
      </div>

      {/* Tabs and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
        <div className="bg-[#12141a] p-1.5 rounded-xl flex items-center border border-gray-800 self-start">
          <Link
            href="/my-plan"
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              currentTab === "plan" ? "bg-[#222630] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </Link>
          <Link
            href="/my-plan?tab=saved"
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              currentTab === "saved" ? "bg-[#222630] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </Link>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <span className="text-gray-400 text-sm">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#12141a] border border-gray-800 text-white text-sm px-4 py-2.5 rounded-xl outline-none cursor-pointer"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calorie</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* List or Empty State */}
      {sortedList.length === 0 ? (
        <div className="bg-[#12141a] border border-gray-800 rounded-2xl py-16 flex flex-col items-center justify-center text-center p-6">
          <h2 className="text-2xl font-oswald font-black text-white uppercase mb-2">
            NOTHING HERE YET
          </h2>
          <p className="text-gray-400 text-sm max-w-md mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full hover:bg-[#b3e600] transition-all"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => (
            <div
              key={item.id}
              className="bg-[#12141a] border border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-white"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-28 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-900">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-oswald font-bold">{item.name}</h3>
                  <p className="text-gray-400 text-xs mb-2">{item.equipment}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3" /> {item.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" /> {item.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Link
                  href={`/workout/${item.id}`}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  View Details
                </Link>

                {currentTab === "plan" && (
                  <button
                    onClick={() => markAsDone(item.id)}
                    className="p-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl transition-colors"
                    title="Mark as done"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() =>
                    currentTab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id)
                  }
                  className="p-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading plan...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}