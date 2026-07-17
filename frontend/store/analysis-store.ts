import { create } from "zustand";

interface AnalysisStore {
  analysis: any;
  loading: boolean;
  refresh: number;
  setAnalysis: (analysis: any) => void;
  setLoading: (loading: boolean) => void;
  setRefresh:()=>void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  analysis: null,
  loading: false,
  refresh:0,

  setAnalysis: (analysis) =>
    set({
      analysis,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setRefresh:()=>set((state)=>({
    refresh:state.refresh+1,
    })),
}));