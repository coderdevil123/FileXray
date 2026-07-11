import AnalysisCard from "./AnalysisCard";
import { Analysis } from "@/types/analysis";

interface IOCCardProps {
  analysis: Analysis;
}

export default function IOCCard({
  analysis,
}: IOCCardProps) {
  return (
    <AnalysisCard
      title="Indicators of Compromise"
      icon={<span>🌐</span>}
    >
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>URLs</span>
          <span>{analysis.ioc.urls}</span>
        </div>

        <div className="flex justify-between">
          <span>IP Addresses</span>
          <span>{analysis.ioc.ips}</span>
        </div>
      </div>
    </AnalysisCard>
  );
}