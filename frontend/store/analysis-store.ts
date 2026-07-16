import { create } from "zustand";

interface AnalysisStore {
  analysis: any;
  loading: boolean;

  setAnalysis: (analysis: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  analysis: null,
  loading: false,

  setAnalysis: (analysis) =>
    set({
      analysis,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),
}));