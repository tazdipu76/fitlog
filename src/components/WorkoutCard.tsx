import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#16191e] border border-gray-800/80 rounded-2xl overflow-hidden hover:border-gray-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="relative w-full h-52 bg-[#0d0f12] overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-5 space-y-3">
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups?.map((group, index) => (
              <span
                key={index}
                className="bg-[#ccff00]/10 text-[#ccff00] font-extrabold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-oswald font-black text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
            {workout.name}
          </h3>
          <p className="text-sm font-medium text-gray-400">{workout.equipment}</p>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-800/60 flex items-center gap-4 text-xs font-semibold text-gray-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{workout.duration} min</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4" />
          <span>{workout.caloriesBurned} kcal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span>{workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}