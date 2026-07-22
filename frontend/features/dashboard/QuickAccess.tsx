"use client";
import { useState } from "react";
import { Download, FileText, RefreshCw } from "lucide-react";
import { useAnalysisStore } from "@/store/analysis-store";
import { generateReport, downloadReport } from "@/services/reportService";
import ScanDetailsDrawer from "@/features/report/ScanDetailsDrawer";
import { toast } from "sonner";

interface QuickActionsProps {
  scan: any;
}

export default function QuickActions({ scan }: QuickActionsProps) {
  const { clearAnalysis } = useAnalysisStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!scan?.id) {
      toast.error("No scan available. Upload a file first.");
      return;
    }
    setExporting(true);
    try {
      const response = await generateReport(scan.id, "pdf");
      downloadReport(response.filename);
      toast.success("Report generated. Download started.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate report.");
    } finally {
      setExporting(false);
    }
  };

  const handleViewReport = () => {
    if (!scan) {
      toast.error("No scan available. Upload a file first.");
      return;
    }
    setDrawerOpen(true);
  };

  const handleNewScan = () => {
    clearAnalysis();
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const actions = [
    { title: "Export PDF", icon: Download, onClick: handleExportPDF, disabled: exporting },
    { title: "View Report", icon: FileText, onClick: handleViewReport, disabled: false },
    { title: "New Scan", icon: RefreshCw, onClick: handleNewScan, disabled: false },
  ];

  return (
    <>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                onClick={action.onClick}
                disabled={action.disabled}
                className="flex items-center justify-center gap-3 rounded-lg border border-zinc-800 p-5 transition hover:border-emerald-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon size={20} />
                {action.title}
              </button>
            );
          })}
        </div>
      </div>
      <ScanDetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        analysis={scan}
      />
    </>
  );
}
