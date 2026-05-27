import { Target, Heart, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Results-driven coaching",
    description:
      "Every session is designed to move you closer to your fitness goals. No fluff — just effective, science-backed training that works.",
  },
  {
    icon: Heart,
    title: "Personal connection",
    description:
      "You are not a number. Our coaches know your name, your goals, and your limits. We adapt every workout to your unique needs.",
  },
  {
    icon: TrendingUp,
    title: "Continuous growth",
    description:
      "From your first push-up to your first marathon, we scale with you. Progress tracking, feedback loops, and constant improvement.",
  },
];

export default function Mission() {
  return (
    <section className="bg-neutral-50 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Our mission
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-500">
            We believe everyone deserves access to world-class fitness coaching —
            not just gym members or celebrities. Live, interactive, and built
            around your life.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-black/5 ring-1 ring-black/5">
                <value.icon className="h-7 w-7 text-neutral-900" />
              </div>
              <h3 className="mt-6 text-base font-semibold text-neutral-900">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-500">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
