import { LoaderCircle } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="rounded-xl bg-zinc-900 p-8 text-center">
        <LoaderCircle
          className="mx-auto animate-spin text-emerald-500"
          size={48}
        />

        <h2 className="mt-6 text-xl font-bold">
          Analyzing File
        </h2>

        <p className="mt-2 text-zinc-400">
          Static analysis in progress...
        </p>
      </div>
    </div>
  );
}