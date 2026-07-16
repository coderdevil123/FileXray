import Navbar from "@/features/shared/Navbar";
import { Toaster } from "sonner";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Toaster richColors />
      <Navbar />
      <main className="min-h-screen bg-zinc-950">
        {children}
      </main>
    </>
  );
}