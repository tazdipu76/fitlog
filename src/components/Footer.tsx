import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0c0e] border-t border-gray-800/60 py-6 px-4 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-white font-black tracking-widest text-lg uppercase font-oswald">
          FITLOG
        </Link>
        <p className="text-gray-400 text-xs md:text-sm font-medium text-center md:text-right">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}