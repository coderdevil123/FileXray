"use client";

import { Analysis } from "@/types/analysis";
import { useState } from "react";

export function useAnalysis(){

    const [analysis,setAnalysis]=useState<Analysis | null>(null);
    const [loading,setLoading]=useState(false);
    return{

        analysis,

        setAnalysis,

        loading,

        setLoading,

    };

}