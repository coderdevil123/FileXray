"use client";
import { useState } from "react";
import ScanDetailsDrawer from "@/features/report/ScanDetailsDrawer";
import { useHistory } from "@/hooks/useHistory";
export default function RecentScans() {
  const { history } = useHistory();
  const [selected,setSelected]=useState<any>(null);
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Scans
      </h2>
      <div className="space-y-4">
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
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                scan.risk_level === "HIGH"
                  ? "bg-red-500/15 text-red-400"
                  : scan.risk_level === "MEDIUM"
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-emerald-500/15 text-emerald-400"
              }`}
            >
              {scan.risk_level}
            </span>
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