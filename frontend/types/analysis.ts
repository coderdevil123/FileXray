export interface Analysis {
  risk: {
    score: number;
    level: "SAFE" | "LOW" | "MEDIUM" | "HIGH";
  };
  hash: {
    md5: string;
    sha256: string;
  };
  metadata: {
    filename: string;
    size: string;
    type: string;
  };
  entropy: {
    value: number;
  };
  ioc: {
    urls: number;
    ips: number;
  };
  aiSummary: {
    title: string;
    summary: string;
  };
}