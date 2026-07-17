"use client";
import { useAnalysisStore } from "@/store/analysis-store";
import { useCallback, useEffect, useState } from "react";
import { getHistory } from "@/services/historyService";

export function useHistory() {
  const { refresh } = useAnalysisStore();
  const [history, setHistory] = useState<any[]>([]);

  const refreshHistory = useCallback(async () => {
    const data = await getHistory();
    setHistory(data);
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refresh]);

  return {
    history,
    refreshHistory,
  };
}