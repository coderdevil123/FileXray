"use client";
import { useAnalysisStore } from "@/store/analysis-store";
import { useCallback, useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardService";

export function useDashboardStats() {
  const { refresh } = useAnalysisStore();
  const [stats, setStats] = useState<any>(null);

  const refreshStats = useCallback(async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refresh]);

  return {
    stats,
    refreshStats,
  };
}
