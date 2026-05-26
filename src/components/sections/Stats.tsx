export default function Stats() {
  const stats = [
    { value: "5,000+", label: "Sessions completed" },
    { value: "1,200+", label: "Happy clients" },
    { value: "98%", label: "Satisfaction rate" },
    { value: "4.9", label: "Average rating" },
  ];

  return (
    <section className="border-y border-neutral-800 bg-neutral-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
