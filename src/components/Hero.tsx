import Image from "../assets/banner.png";

export default function Hero() {
  return (
    <section className="bg-[#121418] text-white rounded-3xl p-8 md:p-16 my-6 mx-4 md:mx-8 flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="max-w-xl space-y-6">
        <span className="text-[#ccff00] font-mono text-xs md:text-sm font-bold tracking-widest uppercase bg-[#ccff00]/10 px-3 py-1 rounded-full">
          WORKOUT LIBRARY
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-oswald tracking-tight uppercase leading-[1.1]">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <div>
          <a
            href="#library"
            className="inline-block bg-[#ccff00] text-black font-extrabold text-sm tracking-wider uppercase px-8 py-4 rounded-xl transition-all hover:bg-[#b3e600] hover:scale-105"
          >
            BROWSE WORKOUTS
          </a>
        </div>
      </div>
      
      <div className="w-full lg:w-auto flex justify-center">
        <img src={Image.src || Image} alt="Workout Banner" className="max-w-full h-auto object-contain" />
      </div>
    </section>
  );
}