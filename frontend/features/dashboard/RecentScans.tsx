"use client";
import { useState } from "react";
import ScanDetailsDrawer from "@/features/report/ScanDetailsDrawer";
import { useHistory } from "@/hooks/useHistory";
import RiskBadge from "@/components/RiskBadge";
export default function RecentScans() {
  const { history } = useHistory();
  const [selected,setSelected]=useState<any>(null);
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Scans
      </h2>
      <div className="space-y-4">
        {history.length === 0 && (
          <div className="rounded-lg border border-dashed border-zinc-700 p-10 text-center">
            <p className="text-lg font-medium text-zinc-300">
              No scans yet
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Upload a file to begin analysis.
            </p>
          </div>
        )}
        {history.map((scan: any) => (
          <div
            key={scan.id}
            onClick={() => setSelected(scan)}
            className="cursor-pointer flex items-center justify-between rounded-lg border border-zinc-800 p-4 transition hover:border-zinc-700 hover:bg-zinc-800/40"
          >
            <div>
              <p className="font-medium">{scan.filename}</p>
              <p className="text-sm text-zinc-500">
                {new Date(scan.created_at).toLocaleString()}
              </p>
            </div>
            <RiskBadge level={scan.risk_level} />
          </div>
        ))}
        <ScanDetailsDrawer
          open={selected!==null}
          analysis={selected}
          onClose={()=>setSelected(null)}
        />
      </div>
    </div>
  );
}