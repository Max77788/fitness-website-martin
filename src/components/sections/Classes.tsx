import { Dumbbell, Flame, Wind, CircleDot } from "lucide-react";

const classes = [
  {
    icon: Flame,
    name: "HIIT & Cardio",
    level: "All levels",
    duration: "45 min",
    description:
      "High-intensity intervals to torch calories and boost endurance. Fast, fun, and incredibly effective.",
  },
  {
    icon: Dumbbell,
    name: "Strength & Muscle",
    level: "Beginner to advanced",
    duration: "60 min",
    description:
      "Progressive resistance training to build lean muscle, increase metabolism, and get stronger every week.",
  },
  {
    icon: Wind,
    name: "Yoga & Mobility",
    level: "All levels",
    duration: "50 min",
    description:
      "Improve flexibility, reduce stress, and prevent injury with guided flows and deep stretching.",
  },
  {
    icon: CircleDot,
    name: "Boxing Fitness",
    level: "Intermediate",
    duration: "45 min",
    description:
      "Punch, slip, and sweat your way through a full-body workout inspired by professional boxing training.",
  },
];

export default function Classes() {
  return (
    <section className="bg-black py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Our classes
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-500">
            A variety of live formats to keep you engaged, challenged, and
            progressing. Pick what fits your mood and your goals.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
          {classes.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 transition hover:border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                  <c.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {c.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-neutral-500">
                    <span>{c.level}</span>
                    <span className="h-1 w-1 rounded-full bg-neutral-700" />
                    <span>{c.duration}</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-400">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
