import { getQueueByDate } from "@/app/lib/data";
import { updateEntryStatus } from "@/app/lib/actions";
import { todayIso } from "@/app/lib/types";
import DateForm from "@/app/components/DateForm";
import StatusBadge from "@/app/components/StatusBadge";

export default async function WeighingPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;
  const date = params.date || todayIso();
  const entries = await getQueueByDate(date);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-zinc-900">
          Весовая — {date}
        </h1>
        <DateForm action="/weighing" date={date} />
      </div>

      {entries.length === 0 ? (
        <p className="mt-8 text-zinc-500">На эту дату записей нет.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {entries.map((entry, i) => (
            <li
              key={entry.id}
              className="rounded-md border border-zinc-200 bg-white p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-medium text-zinc-900">
                    #{i + 1} · {entry.supplierName} · {entry.vehiclePlate}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {entry.slot ? entry.slot.startTime : "Живая очередь"} ·{" "}
                    {entry.volumeTons} т заявлено
                    {entry.actualWeightTons != null &&
                      ` · ${entry.actualWeightTons} т фактически`}
                  </div>
                </div>
                <StatusBadge status={entry.status} />
              </div>

              <div className="mt-3">
                {entry.status === "CONFIRMED" && (
                  <form action={updateEntryStatus}>
                    <input type="hidden" name="id" value={entry.id} />
                    <input type="hidden" name="status" value="ARRIVED" />
                    <button
                      type="submit"
                      className="rounded-md bg-amber-600 px-3 py-1.5 text-sm text-white hover:bg-amber-700"
                    >
                      Отметить прибытие
                    </button>
                  </form>
                )}

                {entry.status === "ARRIVED" && (
                  <form action={updateEntryStatus}>
                    <input type="hidden" name="id" value={entry.id} />
                    <input type="hidden" name="status" value="WEIGHING" />
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                    >
                      На весах
                    </button>
                  </form>
                )}

                {entry.status === "WEIGHING" && (
                  <form
                    action={updateEntryStatus}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <input type="hidden" name="id" value={entry.id} />
                    <input type="hidden" name="status" value="DONE" />
                    <label className="text-sm text-zinc-600">
                      Фактический вес, т:
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="actualWeightTons"
                      required
                      className="w-28 rounded-md border border-zinc-300 px-2 py-1 text-sm"
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-green-700 px-3 py-1.5 text-sm text-white hover:bg-green-800"
                    >
                      Принято
                    </button>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
