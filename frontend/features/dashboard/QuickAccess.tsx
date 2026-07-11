import { Download, FileText, RefreshCw } from "lucide-react";

const actions = [
  {
    title: "Export PDF",
    icon: Download,
  },
  {
    title: "View Report",
    icon: FileText,
  },
  {
    title: "New Scan",
    icon: RefreshCw,
  },
];

export default function QuickActions() {
  return (
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
              className="flex items-center justify-center gap-3 rounded-lg border border-zinc-800 p-5 transition hover:border-emerald-500 hover:bg-zinc-800"
            >
              <Icon size={20} />
              {action.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}