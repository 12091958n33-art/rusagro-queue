export type EntryType = "SLOT" | "WALKIN";

export type EntryStatus =
  | "CONFIRMED"
  | "ARRIVED"
  | "WEIGHING"
  | "DONE"
  | "CANCELLED";

export const STATUS_LABELS: Record<EntryStatus, string> = {
  CONFIRMED: "Ожидается",
  ARRIVED: "Прибыл",
  WEIGHING: "На весах",
  DONE: "Принято",
  CANCELLED: "Отменено",
};

export const STATUS_COLORS: Record<EntryStatus, string> = {
  CONFIRMED: "bg-slate-100 text-slate-700",
  ARRIVED: "bg-amber-100 text-amber-800",
  WEIGHING: "bg-blue-100 text-blue-800",
  DONE: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-700",
};

export function todayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
