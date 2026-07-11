interface InfoRowProps {
  label: string;
  value: string | number;
  mono?: boolean;
}

export default function InfoRow({
  label,
  value,
  mono = false,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 py-2">
      <span className="text-zinc-400">
        {label}
      </span>

      <span
        className={
          mono
            ? "font-mono text-sm"
            : ""
        }
      >
        {value}
      </span>
    </div>
  );
}