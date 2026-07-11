interface StatusBadgeProps {
  label: string;
  color: "green" | "yellow" | "red";
}

export default function StatusBadge({
  label,
  color,
}: StatusBadgeProps) {
  const styles = {
    green:
      "bg-emerald-500/15 text-emerald-400",

    yellow:
      "bg-amber-500/15 text-amber-400",

    red:
      "bg-red-500/15 text-red-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[color]}`}
    >
      {label}
    </span>
  );
}