import AnalysisCard from "./AnalysisCard";
import InfoRow from "../shared/InfoRow";
import { Analysis } from "@/types/analysis";

interface MetadataCardProps {
  analysis: Analysis;
}

export default function MetadataCard({
  analysis,
}: MetadataCardProps) {
  return (
    <AnalysisCard
      title="File Metadata"
      icon={<span>📄</span>}
    >
      <div className="space-y-3">
        <InfoRow
          label="Filename"
          value={analysis.metadata.filename}
        />

        <InfoRow
          label="Size"
          value={analysis.metadata.size}
        />

        <InfoRow
          label="Type"
          value={analysis.metadata.type}
        />
      </div>
    </AnalysisCard>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-zinc-800 pb-2">
      <span className="text-zinc-400">
        {label}
      </span>

      <span>{value}</span>
    </div>
  );
}