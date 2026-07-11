import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-emerald-500" />
          <div>
            <h1 className="text-lg font-bold">FileXray</h1>
            <p className="text-xs text-zinc-400">
              Static Malware Analysis
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-8 text-sm text-zinc-300">
          <Link href="/">Dashboard</Link>
          <Link href="#">Reports</Link>
          <Link href="#">History</Link>
          <Link href="#">Settings</Link>
        </nav>
      </div>
    </header>
  );
}