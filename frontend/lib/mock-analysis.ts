import { Analysis } from "@/types/analysis";

export const mockAnalysis = {
  risk:{
    score:73,
    level:"HIGH" as const,
  },
  hash:{
    md5:"13d3df37a42d8a81a671738553be2b06",
    sha256:"8a536b4bbe437e67c419ba73c3073f5ac4ebad86cd1e5cd6590ec74ef93ee619",
  },
  metadata:{
    filename:"invoice.exe",
    size:"1.8 MB",
    type:"PE32 Executable",
  },
  entropy:{
    value:7.82,
  },
  ioc:{
    urls:2,
    ips:1,
  },

  aiSummary:{
    title:"High Risk Executable",
    summary:
      "The uploaded executable appears to be packed due to its very high entropy. Static analysis identified external network indicators and characteristics commonly observed in malware samples. Manual investigation is recommended before execution."
  }
};