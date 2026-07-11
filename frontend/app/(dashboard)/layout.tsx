import Navbar from "@/features/shared/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950">
        {children}
      </main>
    </>
  );
}