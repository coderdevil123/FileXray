import { create } from "zustand";

interface AnalysisStore {
  analysis: any;
  scan: any;
  loading: boolean;
  refresh: number;
  setAnalysis: (analysis: any) => void;
  setScan: (scan: any) => void;
  setLoading: (loading: boolean) => void;
  setRefresh: () => void;
  clearAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  analysis: null,
  scan: null,
  loading: false,
  refresh: 0,

  setAnalysis: (analysis) =>
    set({
      analysis,
    }),

  setScan: (scan) =>
    set({
      scan,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setRefresh: () => set((state) => ({
    refresh: state.refresh + 1,
  })),

  clearAnalysis: () =>
    set({
      analysis: null,
      scan: null,
    }),
}));
