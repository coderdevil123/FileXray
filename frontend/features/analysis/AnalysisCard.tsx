import { ReactNode } from "react";

interface AnalysisCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function AnalysisCard({
  title,
  icon,
  children,
}: AnalysisCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-emerald-500">
      <div className="mb-5 flex items-center gap-3">
        <div className="text-emerald-500">
          {icon}
        </div>

        <h2 className="text-lg font-semibold">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}