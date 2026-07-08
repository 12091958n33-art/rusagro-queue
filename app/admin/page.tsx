import { getSlotsByDate, getAllEntriesByDate } from "@/app/lib/data";
import { createSlot, deleteSlot, cancelEntry } from "@/app/lib/actions";
import { todayIso } from "@/app/lib/types";
import DateForm from "@/app/components/DateForm";
import StatusBadge from "@/app/components/StatusBadge";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;
  const date = params.date || todayIso();
  const [slots, entries] = await Promise.all([
    getSlotsByDate(date),
    getAllEntriesByDate(date),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-zinc-900">
          Диспетчер — {date}
        </h1>
        <DateForm action="/admin" date={date} />
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-800">
          Слоты на {date}
        </h2>

        <form
          action={createSlot}
          className="mt-3 flex flex-wrap items-end gap-3 rounded-md border border-zinc-200 bg-white p-4"
        >
          <input type="hidden" name="date" value={date} />
          <div>
            <label className="block text-xs text-zinc-600">Начало</label>
            <input
              type="time"
              name="startTime"
              required
              className="rounded-md border border-zinc-300 px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-600">Конец</label>
            <input
              type="time"
              name="endTime"
              required
              className="rounded-md border border-zinc-300 px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-600">
              Вместимость (машин)
            </label>
            <input
              type="number"
              name="capacity"
              min="1"
              defaultValue={1}
              required
              className="w-28 rounded-md border border-zinc-300 px-2 py-1 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
          >
            Добавить слот
          </button>
        </form>

        {slots.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">
            На эту дату ещё нет слотов.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-zinc-100 rounded-md border border-zinc-200 bg-white">
            {slots.map((slot) => (
              <li
                key={slot.id}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <span>
                  {slot.startTime}–{slot.endTime} · занято {slot.booked} из{" "}
                  {slot.capacity}
                </span>
                {slot.booked === 0 && (
                  <form action={deleteSlot}>
                    <input type="hidden" name="id" value={slot.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                    >
                      Удалить
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-zinc-800">
          Все заявки на {date}
        </h2>

        {entries.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">Заявок пока нет.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-md border border-zinc-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-600">
                <tr>
                  <th className="px-4 py-2">Время</th>
                  <th className="px-4 py-2">Поставщик</th>
                  <th className="px-4 py-2">Телефон</th>
                  <th className="px-4 py-2">Номер</th>
                  <th className="px-4 py-2">Тонн</th>
                  <th className="px-4 py-2">Статус</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-t border-zinc-100">
                    <td className="px-4 py-3">
                      {entry.slot ? entry.slot.startTime : "Живая очередь"}
                    </td>
                    <td className="px-4 py-3">{entry.supplierName}</td>
                    <td className="px-4 py-3">{entry.phone}</td>
                    <td className="px-4 py-3">{entry.vehiclePlate}</td>
                    <td className="px-4 py-3">{entry.volumeTons}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={entry.status} />
                    </td>
                    <td className="px-4 py-3">
                      {entry.status !== "CANCELLED" &&
                        entry.status !== "DONE" && (
                          <form action={cancelEntry}>
                            <input type="hidden" name="id" value={entry.id} />
                            <button
                              type="submit"
                              className="text-red-600 hover:underline"
                            >
                              Отменить
                            </button>
                          </form>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
