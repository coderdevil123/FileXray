"use client";
import { useAnalysisStore } from "@/store/analysis-store";
import UploadCard from "@/features/upload/UploadCard";
import StatCard from "@/features/dashboard/StatCard";
import {
    Shield,
    Files,
    Activity,
    FileCheck
} from "lucide-react";
import RiskCard from "@/features/analysis/RiskCard";
import { mockAnalysis } from "@/lib/mock-analysis";
import HashCard from "@/features/analysis/HashCard";
import MetadataCard from "@/features/analysis/MetadataCard";
import EntropyCard from "@/features/analysis/EntropyCard";
import IOCCard from "@/features/analysis/IOCCard";
import AISummaryCard from "@/features/analysis/AISummaryCard";
import Timeline from "@/features/dashboard/Timeline";
import RecentScans from "@/features/dashboard/RecentScans";
import QuickActions from "@/features/dashboard/QuickAccess";
import LoadingOverlay from "@/features/shared/LoadingOverlay";
import ScanOverview from "@/features/analysis/ScanOverview";

export default function DashboardPage() {
  const { analysis, loading } = useAnalysisStore();
  const dashboardAnalysis = analysis
  ? {
      risk: analysis.risk,

      metadata: {
        filename: analysis.analysis.metadata.data.filename,
        size: analysis.analysis.metadata.data.size,
        type: analysis.analysis.metadata.data.mime_type,
      },

      hash: analysis.analysis.hash.data,

      entropy: {
        value: analysis.analysis.entropy.data.entropy,
      },

      ioc: {
        urls: analysis.analysis.ioc.data.url_count,
        ips: analysis.analysis.ioc.data.ipv4_count,
      },

      aiSummary: {
        title: analysis.risk.level,
        summary:
          analysis.risk.findings.join(". ") ||
          "No suspicious indicators detected.",
      },
    }
  : mockAnalysis;
  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">

      <section>

        <h1 className="text-5xl font-bold">
          AI-Assisted
          <span className="text-emerald-500">
            {" "}Static Malware Analysis
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          Upload suspicious files and receive
          comprehensive static analysis,
          indicators of compromise,
          PE inspection,
          entropy analysis,
          and risk scoring.
        </p>

      </section>

        <section>
            <UploadCard />
        </section>
        {analysis && (
          <section>
            <ScanOverview analysis={analysis} />
          </section>
        )}
      <section>
        <RiskCard
            score={dashboardAnalysis.risk.score}
            level={dashboardAnalysis.risk.level}
        />
      </section>

      <section>
        <AISummaryCard analysis={dashboardAnalysis} />
      </section>

      <section>
        <RecentScans/>
      </section>

      <section>
        <QuickActions/>
      </section>

      <section>
        <Timeline/>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <MetadataCard analysis={dashboardAnalysis} />
        <HashCard analysis={dashboardAnalysis} />
        <EntropyCard analysis={dashboardAnalysis} />
        <IOCCard analysis={dashboardAnalysis} />
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
        title="Files Scanned"
        value="0"
        icon={Files}
        />

        <StatCard
        title="Threat Score"
        value="Safe"
        icon={Shield}
        />

        <StatCard
        title="Analysis Engine"
        value="v1.0"
        icon={Activity}
        />

        <StatCard
        title="Reports"
        value="0"
        icon={FileCheck}
        />

      </section>


      </div>
    </>
  );
}