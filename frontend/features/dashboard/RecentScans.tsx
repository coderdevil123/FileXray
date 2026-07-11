const scans = [
  {
    file: "invoice.exe",
    risk: "HIGH",
    date: "Today, 14:21",
  },
  {
    file: "document.pdf",
    risk: "SAFE",
    date: "Today, 12:40",
  },
  {
    file: "setup.zip",
    risk: "MEDIUM",
    date: "Yesterday",
  },
];

export default function RecentScans() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Scans
      </h2>

      <div className="space-y-4">
        {scans.map((scan) => (
          <div
            key={`${scan.file}-${scan.date}`}
            className="flex items-center justify-between rounded-lg border border-zinc-800 p-4"
          >
            <div>
              <p className="font-medium">{scan.file}</p>
              <p className="text-sm text-zinc-500">{scan.date}</p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                scan.risk === "HIGH"
                  ? "bg-red-500/15 text-red-400"
                  : scan.risk === "MEDIUM"
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-emerald-500/15 text-emerald-400"
              }`}
            >
              {scan.risk}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}