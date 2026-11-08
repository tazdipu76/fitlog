"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Logo from "../assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <nav className="border-b border-gray-800 bg-[#0d0f12] px-4 md:px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-extrabold tracking-wider font-oswald text-white flex items-center gap-3"
        >
          <img src={Logo.src || Logo} alt="FitLog Logo" className="h-7 w-auto object-contain" />
          <span>FITLOG</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-medium transition-colors ${
              pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Plan & Saved Badges */}
        <div className="flex items-center gap-4">
          <Link 
            href="/my-plan" 
            className="flex items-center gap-2 text-sm bg-[#16191e] px-3 py-1.5 rounded-full border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black font-bold px-2 py-0.5 rounded-full text-xs">
              {plan.length}
            </span>
          </Link>

          <Link 
            href="/my-plan?tab=saved" 
            className="flex items-center gap-2 text-sm bg-[#16191e] px-3 py-1.5 rounded-full border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <span>Saved</span>
            <span className="border border-gray-600 text-gray-300 font-bold px-2 py-0.5 rounded-full text-xs">
              {saved.length}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}