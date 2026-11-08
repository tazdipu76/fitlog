"use client";

import { useState, useEffect } from "react";
import { Workout } from "@/types";
import { getAllWorkouts } from "@/utils/api";
import WorkoutCard from "@/components/WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section id="library" className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-oswald font-black uppercase tracking-tight text-white">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Workouts covering every major muscle group.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-[#16191e] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}