"use client";
import { useState } from "react";
import { useAnalysisStore } from "@/store/analysis-store";
import { useRef } from "react";
import { UploadCloud } from "lucide-react";
import { uploadFile } from "@/services/uploadService";
import { toast } from "sonner";
export default function UploadCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
  setAnalysis,
  setLoading,
  setRefresh,
} = useAnalysisStore();

  const [dragging, setDragging] = useState(false);

  const browseFiles = () => {
    inputRef.current?.click();
  };

  const handleDrop = async (
      event: React.DragEvent<HTMLDivElement>
  ) => {
      event.preventDefault();
      setDragging(false);
      const file = event.dataTransfer.files[0];
      if (!file) return;
      await analyzeFile(file)
      setSelectedFile(file);
      setLoading(true);
      try {
          const result = await uploadFile(file);
          setAnalysis(result.data.analysis);
          setRefresh();
      } catch (error) {
          console.error(error);
      } finally {
          setLoading(false);
      }
  };

  const handleDragOver = (
      event: React.DragEvent<HTMLDivElement>
  ) => {
      event.preventDefault();
      setDragging(true);
  };

  const handleDragLeave = () => {
      setDragging(false);
  };

  const analyzeFile = async (
      file: File
    ) => {
      setSelectedFile(file);
      setLoading(true);
      try {
          const result = await uploadFile(file);
          setAnalysis(result.data.analysis);
          setRefresh();
      } catch (error) {
          console.error(error);
      } finally {
          setLoading(false);
      }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
    if (!file) {
      return;
    }
    await analyzeFile(file);
    setLoading(true);
    try {
      const result = await uploadFile(file);

      setAnalysis(result.data.analysis);
      setRefresh();
    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900 p-12 text-center transition hover:border-emerald-500"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <UploadCloud className="mx-auto h-16 w-16 text-emerald-500" />

      <h2 className="mt-6 text-3xl font-bold">
        Drag & Drop Files
      </h2>

      <p className="mt-3 text-zinc-400">
        Upload suspicious files for comprehensive static analysis.
      </p>

      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={handleFileChange}
      />

      <button
        onClick={browseFiles}
        className="mt-8 rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-black transition hover:bg-emerald-400"
      >
        Browse Files
      </button>

      {selectedFile && (
        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-800/50 p-4 text-left">
          <p className="font-medium">{selectedFile.name}</p>

          <p className="text-sm text-zinc-400">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {["EXE", "DLL", "PDF", "DOCX", "ZIP", "TXT"].map((type) => (
          <span
            key={type}
            className="rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
          >
            {type}
          </span>
        ))}
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Maximum upload size: 100 MB
      </p>
    </div>
  );
}