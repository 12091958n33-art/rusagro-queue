import { STATUS_COLORS, STATUS_LABELS, type EntryStatus } from "@/app/lib/types";

export default function StatusBadge({ status }: { status: string }) {
  const key = status as EntryStatus;
  const label = STATUS_LABELS[key] ?? status;
  const color = STATUS_COLORS[key] ?? "bg-zinc-100 text-zinc-700";
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}
