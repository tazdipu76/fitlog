"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { Workout } from "@/types";
import { Clock, Flame, Star } from "lucide-react";

type Params = Promise<{ id: string }>;

export default function WorkoutDetails({ params }: { params: Params }) {
  // Next.js 15+ এ params হলো Promise, তাই use() হুক দিয়ে এটি রিসিভ করতে হয়
  const { id } = use(params);

  const { plan, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 font-oswald text-xl">
        Loading workout details...
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 font-oswald text-xl">
        Workout not found!
      </div>
    );
  }

  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = plan.some((item) => item.id === workout.id);

  return (
    <div className="min-h-screen py-8 px-4 md:px-12 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-[#121418] p-6 md:p-8 rounded-3xl border border-gray-800">
        
        {/* Left Side: Image */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#0d0f12]">
          <Image 
            src={workout.image} 
            alt={workout.name} 
            fill 
            className="object-cover" 
            priority 
          />
        </div>

        {/* Right Side: Details & Actions */}
        <div className="space-y-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {workout.muscleGroups?.map((group, idx) => (
                <span key={idx} className="bg-[#ccff00] text-black font-extrabold text-xs px-3 py-1 rounded-full uppercase">
                  {group}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-oswald font-black uppercase mb-3 text-white">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {workout.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#0d0f12] p-4 rounded-xl border border-gray-800 mb-6 text-sm">
              <div>
                <span className="text-gray-500 block text-xs">Equipment</span>
                <span className="font-semibold">{workout.equipment}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Difficulty</span>
                <span className="font-semibold">{workout.difficulty}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Duration</span>
                <span className="font-semibold flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-400" /> {workout.duration} min</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Calories</span>
                <span className="font-semibold flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-gray-400" /> {workout.caloriesBurned} kcal</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Sets & Reps</span>
                <span className="font-semibold">{workout.sets} Sets / {workout.reps}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Rating</span>
                <span className="font-semibold flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {workout.rating}</span>
              </div>
            </div>

            {/* Instructions */}
            {workout.instructions && workout.instructions.length > 0 && (
              <div className="space-y-2 mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Instructions</h3>
                <ol className="space-y-2 text-sm text-gray-300">
                  {workout.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="font-bold text-[#ccff00]">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-800">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isPlanFull || isAlreadyInPlan}
              className={`flex-1 font-extrabold py-3.5 px-6 rounded-xl transition-all uppercase text-sm ${
                isAlreadyInPlan || isPlanFull
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-[#ccff00] hover:bg-[#b3e600] text-black cursor-pointer"
              }`}
            >
              {isAlreadyInPlan ? "Already in Plan" : isPlanFull ? "Plan Full (Max 5)" : "Add to today's plan"}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className="bg-transparent hover:bg-gray-800 border border-gray-700 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all uppercase text-sm cursor-pointer"
            >
              Save for later
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}