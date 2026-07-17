import DetailRow from "./DetailRow";

interface Props{
  open:boolean;
  onClose:()=>void;
  analysis:any;
}

export default function ScanDetailsDrawer({
  open,
  onClose,
  analysis,
}:Props){
  if(!open||!analysis)return null;
  const result = analysis.analysis_result;
  const analysisData = result.analysis;
    const risk = result.risk;

    if (!result) {
        return null;
    }
  return(

    <div className="fixed inset-0 z-50 bg-black/60">
      <div className="absolute right-0 top-0 h-full w-[500px] overflow-y-auto border-l border-zinc-800 bg-zinc-900 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Scan Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-4 py-2"
          >
            Close
          </button>
        </div>
        <div className="mt-8 space-y-5">
          <DetailRow
            label="Filename"
            value={analysisData.metadata.data.filename}
          />

          <DetailRow
            label="SHA256"
            value={analysisData.hash.data.sha256}
          />

          <DetailRow
            label="MD5"
            value={analysisData.hash.data.md5}
          />

          <DetailRow
            label="Entropy"
            value={analysisData.entropy.data.entropy.toString()}
          />

          <DetailRow
            label="Risk"
            value={risk.level}
          />

          <DetailRow
            label="Execution"
            value={`${result.execution_time}s`}
          />

        </div>
      </div>
    </div>
  );
}