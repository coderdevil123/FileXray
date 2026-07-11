import AnalysisCard from "./AnalysisCard";
import InfoRow from "../shared/InfoRow";
import { Analysis } from "@/types/analysis";

interface HashCardProps {
  analysis: Analysis;
}

export default function HashCard({
  analysis,
}: HashCardProps) {
  return (
    <AnalysisCard
      title="Hash Information"
      icon={<span>🔑</span>}
    >
      <div className="space-y-4 text-sm">
        <div>
          <InfoRow
            label="MD5"
            value={analysis.hash.md5}
            mono
            />

            <InfoRow
            label="SHA256"
            value={analysis.hash.sha256}
            mono
            />
        </div>
      </div>
    </AnalysisCard>
  );
}