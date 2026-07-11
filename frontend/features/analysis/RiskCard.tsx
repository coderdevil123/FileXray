interface RiskCardProps {
  score: number;
  level: "SAFE" | "LOW" | "MEDIUM" | "HIGH";
}

export default function RiskCard({
  score,
  level,
}: RiskCardProps) {
  const color =
    level === "HIGH"
      ? "bg-red-500"
      : level === "MEDIUM"
      ? "bg-amber-500"
      : level === "LOW"
      ? "bg-yellow-500"
      : "bg-emerald-500";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <p className="text-sm uppercase tracking-wider text-zinc-400">
        Threat Level
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-bold">{level}</h2>
          <p className="mt-2 text-zinc-400">
            Risk Score: {score}/100
          </p>
        </div>

        <div className="text-right">
          <div className="text-5xl font-bold text-white">
            {score}
          </div>
        </div>
      </div>

      <div className="mt-8 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}