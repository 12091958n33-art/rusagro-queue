import { getSlotsByDate, getAllEntriesByDate } from "@/app/lib/data";
import {
  createSlot,
  deleteSlot,
  cancelEntry,
  updateEntryStatus,
} from "@/app/lib/actions";
import { todayIso, generateTimeOptions, SLOT_DURATION_MINUTES } from "@/app/lib/types";
import DateForm from "@/app/components/DateForm";
import StatusBadge from "@/app/components/StatusBadge";

const TIME_OPTIONS = generateTimeOptions(SLOT_DURATION_MINUTES);

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
        <h1 className="text-2xl font-extrabold uppercase tracking-tight text-zinc-900">
          Диспетчер — {date}
        </h1>
        <DateForm action="/admin" date={date} />
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold uppercase tracking-tight text-zinc-800">
          Слоты на {date}
        </h2>

        <form
          action={createSlot}
          className="mt-3 flex flex-wrap items-end gap-3 rounded-md border border-zinc-200 bg-white p-4"
        >
          <input type="hidden" name="date" value={date} />
          <div>
            <label className="block text-xs text-zinc-600">
              Время начала (слот — {SLOT_DURATION_MINUTES} мин)
            </label>
            <select
              name="startTime"
              required
              defaultValue=""
              className="rounded-md border border-zinc-300 px-2 py-1.5 text-sm"
            >
              <option value="" disabled>
                Выберите время
              </option>
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
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
            className="rounded-md bg-[#2a418d] px-4 py-2 text-sm font-bold uppercase tracking-tight text-white hover:bg-[#1d2f66]"
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
        <h2 className="text-lg font-extrabold uppercase tracking-tight text-zinc-800">
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
                  <th className="px-4 py-2">Заявлено, т</th>
                  <th className="px-4 py-2">Факт, т</th>
                  <th className="px-4 py-2">Статус</th>
                  <th className="px-4 py-2">Действия</th>
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
                      {entry.actualWeightTons ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={entry.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {entry.status === "CONFIRMED" && (
                          <form action={updateEntryStatus}>
                            <input type="hidden" name="id" value={entry.id} />
                            <input
                              type="hidden"
                              name="status"
                              value="ARRIVED"
                            />
                            <button
                              type="submit"
                              className="rounded-md bg-amber-600 px-2 py-1 text-xs text-white hover:bg-amber-700"
                            >
                              Прибыл
                            </button>
                          </form>
                        )}
                        {entry.status === "ARRIVED" && (
                          <form action={updateEntryStatus}>
                            <input type="hidden" name="id" value={entry.id} />
                            <input
                              type="hidden"
                              name="status"
                              value="WEIGHING"
                            />
                            <button
                              type="submit"
                              className="rounded-md bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                            >
                              На весах
                            </button>
                          </form>
                        )}
                        {entry.status === "WEIGHING" && (
                          <form
                            action={updateEntryStatus}
                            className="flex items-center gap-1"
                          >
                            <input type="hidden" name="id" value={entry.id} />
                            <input
                              type="hidden"
                              name="status"
                              value="DONE"
                            />
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              name="actualWeightTons"
                              required
                              placeholder="т"
                              className="w-16 rounded-md border border-zinc-300 px-1.5 py-1 text-xs"
                            />
                            <button
                              type="submit"
                              className="rounded-md bg-green-700 px-2 py-1 text-xs text-white hover:bg-green-800"
                            >
                              Принято
                            </button>
                          </form>
                        )}
                        {entry.status !== "CANCELLED" &&
                          entry.status !== "DONE" && (
                            <form action={cancelEntry}>
                              <input
                                type="hidden"
                                name="id"
                                value={entry.id}
                              />
                              <button
                                type="submit"
                                className="text-xs text-red-600 hover:underline"
                              >
                                Отменить
                              </button>
                            </form>
                          )}
                      </div>
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
