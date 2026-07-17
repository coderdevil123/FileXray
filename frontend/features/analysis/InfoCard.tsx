interface Props {
  label: string;
  value: string;
}

export default function InfoCard({
  label,
  value,
}: Props) {

  return (
    <div className="rounded-xl bg-zinc-800 p-4">

      <p className="text-sm text-zinc-400">
        {label}
      </p>

      <p className="mt-2 break-all font-semibold">
        {value}
      </p>

    </div>
  );
}