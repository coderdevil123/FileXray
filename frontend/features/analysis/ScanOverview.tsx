import InfoCard from "./InfoCard";
interface Props {
  analysis: any;
}

export default function ScanOverview({
  analysis,
}: Props) {

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            {analysis.analysis.metadata.data.filename}
          </h2>

          <p className="mt-2 text-zinc-400">
            {analysis.analysis.metadata.data.mime_type}
          </p>

        </div>

        <div className="rounded-xl bg-emerald-500/10 px-6 py-3">

          <span className="text-emerald-400 font-semibold">
            {analysis.risk.level}
          </span>

        </div>

      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <InfoCard
          label="SHA256"
          value={analysis.analysis.hash.data.sha256.slice(0,20) + "..."}
        />

        <InfoCard
          label="Size"
          value={`${analysis.analysis.metadata.data.size} Bytes`}
        />

        <InfoCard
          label="Execution"
          value={`${analysis.execution_time}s`}
        />

        <InfoCard
          label="Engine"
          value={analysis.engine.version}
        />

      </div>

    </div>
  );
}