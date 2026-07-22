import DetailRow from "./DetailRow";
import RiskBadge from "@/components/RiskBadge";
import {
    generateReport,
    downloadReport
} from "@/services/reportService";

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
    const summary = risk.findings ?? [];
    const ioc = analysisData.ioc.data;

    if (!result) {
        return null;
    }

    const exportReport=async(
        format:"pdf"|"html"|"json"
    )=>{
        if(!analysis?.id)return;

        const response=await generateReport(
            analysis.id,
            format
        );
        downloadReport(response.filename);
    };
    
  return(

    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div
            className="
                absolute
                right-0
                top-0
                h-full
                w-full
                max-w-xl
                overflow-y-auto
                border-l
                border-zinc-800
                bg-zinc-900
                p-8
                shadow-2xl
                animate-in
                slide-in-from-right
                duration-300
            "
        >
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
          <div className="flex gap-2">
            <button
              onClick={() => exportReport("pdf")}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-400"
            >
              Download PDF
            </button>
            <button
              onClick={() => exportReport("html")}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm transition hover:bg-zinc-700"
            >
              HTML
            </button>
            <button
              onClick={() => exportReport("json")}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm transition hover:bg-zinc-700"
            >
              JSON
            </button>
          </div>
          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-800/40 p-5">
                <h3 className="text-lg font-semibold">
                    Executive Summary
                </h3>
                <p className="mt-3 text-sm text-zinc-400">
                    Overall Risk:
                    <span className="ml-2">
                        <RiskBadge level={risk.level}/>
                    </span>
                </p>
                <div className="mt-5 space-y-2">
                    {summary.map((item:string,index:number)=>(
                        <div
                            key={index}
                            className="flex gap-2"
                        >
                            <span>
                                •
                            </span>
                            <span className="text-sm text-zinc-300">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="mt-8 space-y-5">
            <h3 className="mt-8 mb-3 text-lg font-semibold">
                Technical Details
            </h3>
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
            value={<RiskBadge level={risk.level} />}
          />

          <DetailRow
            label="Execution"
            value={`${result.execution_time}s`}
          />
          <h3 className="mt-8 mb-3 text-lg font-semibold">
            Indicators of Compromise
          </h3>

          <DetailRow
                label="URLs"
                value={ioc.urls.length}
            />

            <DetailRow
                label="Emails"
                value={ioc.emails.length}
            />

            <DetailRow
                label="IP Addresses"
                value={ioc.ip_addresses?.length ?? 0}
            />

            <h3 className="mt-8 mb-3 text-lg font-semibold">
                Suspicious Strings
            </h3>

            <DetailRow
                label="Detected"
                value={analysisData.strings.data.total_strings}
            />
            <div className="rounded-xl bg-zinc-800 p-4">
                <p className="mb-3 text-sm text-zinc-400">
                    Preview
                </p>
                <div className="space-y-2">
                    {analysisData.strings.data.preview
                        .slice(0,10)
                        .map((item:string,index:number)=>(
                            <p
                                key={index}
                                className="break-all font-mono text-xs text-zinc-300"
                            >
                                {item}
                            </p>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}