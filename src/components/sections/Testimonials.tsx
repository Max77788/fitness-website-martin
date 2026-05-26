import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Lost 28 lbs in 4 months",
    body: "I have tried every fitness app out there. FitLive is the only one that actually stuck. The live interaction keeps me accountable, and the coach remembers my name every single session.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Marathon runner",
    body: "The HIIT and strength combo completely changed my endurance. I went from barely finishing a 5K to running my first marathon. The personalized Zoom access makes it feel like a private session.",
    rating: 5,
  },
  {
    name: "Jenna R.",
    role: "Working mom of 3",
    body: "I do not have time for a gym. With FitLive, I squeeze in a 45-minute session before the kids wake up. The flexibility is everything. No commute, no excuses.",
    rating: 5,
  },
  {
    name: "David L.",
    role: "Desk worker, fixed his back pain",
    body: "The mobility and yoga classes saved my posture. After years of back pain from sitting, I finally feel strong and flexible. The coach corrects my form in real time on Zoom.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Yoga convert",
    body: "I was skeptical about online fitness. Then I tried FitLive. The energy is unreal. It feels like the coach is right there in the room pushing me. Highly recommend the monthly plan.",
    rating: 5,
  },
  {
    name: "Chris B.",
    role: "Gained 15 lbs of muscle",
    body: "The strength programming is legit. Progressive overload, proper rest periods, and form checks on camera. I have never been this strong in my life.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-neutral-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What our clients say
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Real people, real results. No stock photos, no fake reviews — just
            honest feedback from people who showed up.
          </p>
        </div>

        <div className="mx-auto mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="mb-6 break-inside-avoid rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-300">
                &ldquo;{t.body}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-emerald-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
