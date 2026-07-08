import { getQueueByDate } from "@/app/lib/data";
import { todayIso } from "@/app/lib/types";
import DateForm from "@/app/components/DateForm";
import StatusBadge from "@/app/components/StatusBadge";
import AutoRefresh from "@/app/components/AutoRefresh";

export default async function QueuePage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;
  const date = params.date || todayIso();
  const entries = await getQueueByDate(date);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <AutoRefresh />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-zinc-900">
          Табло очереди — {date}
        </h1>
        <DateForm action="/queue" date={date} />
      </div>

      {entries.length === 0 ? (
        <p className="mt-8 text-zinc-500">На эту дату записей пока нет.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-md border border-zinc-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-100 text-zinc-600">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Время</th>
                <th className="px-4 py-2">Поставщик</th>
                <th className="px-4 py-2">Номер машины</th>
                <th className="px-4 py-2">Статус</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={entry.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-medium">{i + 1}</td>
                  <td className="px-4 py-3">
                    {entry.slot ? entry.slot.startTime : "Живая очередь"}
                  </td>
                  <td className="px-4 py-3">{entry.supplierName}</td>
                  <td className="px-4 py-3">{entry.vehiclePlate}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={entry.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
