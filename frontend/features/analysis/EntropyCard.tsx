import AnalysisCard from "./AnalysisCard";
import { Analysis } from "@/types/analysis";
interface EntropyCardProps {
  analysis: Analysis;
}

export default function EntropyCard({
  analysis,
}: EntropyCardProps) {
  const entropy = analysis.entropy.value;
  const percentage = (entropy / 8) * 100;

  return (
    <AnalysisCard
      title="Entropy Analysis"
      icon={<span>📊</span>}
    >
      <div>
        <p className="mb-4 text-4xl font-bold">
          {entropy}
        </p>

        <div className="h-3 rounded-full bg-zinc-800">
          <div
            className="h-3 rounded-full bg-emerald-500"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p className="mt-4 text-zinc-400">
          High entropy usually indicates
          compressed, encrypted,
          or packed content.
        </p>
      </div>
    </AnalysisCard>
  );
}