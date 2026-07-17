interface Props {
  level: string;
}

export default function RiskBadge({ level }: Props) {

  const styles = {
    LOW: "bg-emerald-500/15 text-emerald-400",
    MEDIUM: "bg-amber-500/15 text-amber-400",
    HIGH: "bg-red-500/15 text-red-400",
    UNKNOWN: "bg-zinc-700 text-zinc-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[level as keyof typeof styles] ??
        styles.UNKNOWN
      }`}
    >
      {level}
    </span>
  );
}