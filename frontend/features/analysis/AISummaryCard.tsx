import AnalysisCard from "./AnalysisCard";
import { Sparkles } from "lucide-react";
import { Analysis } from "@/types/analysis";
interface Props{
    analysis:Analysis;
}

export default function AISummaryCard({analysis}:Props){

    return(

        <AnalysisCard
            title="AI Security Summary"
            icon={<Sparkles size={20}/>}
        >

            <div className="space-y-4">

                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                    {analysis.aiSummary.title}
                </span>

                <p className="leading-7 text-zinc-300">
                    {analysis.aiSummary.summary}
                </p>

            </div>

        </AnalysisCard>

    );

}