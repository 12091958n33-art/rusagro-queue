import { getSlotsByDate } from "@/app/lib/data";
import { bookSlot } from "@/app/lib/actions";
import { todayIso } from "@/app/lib/types";
import DateForm from "@/app/components/DateForm";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;
  const date = params.date || todayIso();
  const slots = await getSlotsByDate(date);
  const availableSlots = slots.filter((s) => s.free > 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-zinc-900">
        Запись на время сдачи свёклы
      </h1>
      <p className="mt-1 text-sm text-zinc-600">
        Выберите дату, свободный слот и заполните данные.
      </p>

      <div className="mt-6">
        <DateForm action="/book" date={date} />
      </div>

      {slots.length === 0 && (
        <p className="mt-8 rounded-md bg-amber-50 p-4 text-sm text-amber-800">
          На эту дату пока нет открытых слотов. Выберите другую дату или{" "}
          <a href="/walkin" className="underline">
            встаньте в живую очередь
          </a>
          .
        </p>
      )}

      {slots.length > 0 && availableSlots.length === 0 && (
        <p className="mt-8 rounded-md bg-amber-50 p-4 text-sm text-amber-800">
          На эту дату все слоты уже заняты. Выберите другую дату или{" "}
          <a href="/walkin" className="underline">
            встаньте в живую очередь
          </a>
          .
        </p>
      )}

      {availableSlots.length > 0 && (
        <form action={bookSlot} className="mt-8 space-y-6">
          <input type="hidden" name="date" value={date} />

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-800">
              Доступные слоты
            </legend>
            {availableSlots.map((slot, i) => (
              <label
                key={slot.id}
                className="flex items-center justify-between rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm hover:border-green-600"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="slotId"
                    value={slot.id}
                    required
                    defaultChecked={i === 0}
                  />
                  {slot.startTime}–{slot.endTime}
                </span>
                <span className="text-zinc-500">
                  свободно {slot.free} из {slot.capacity}
                </span>
              </label>
            ))}
          </fieldset>

          <div className="space-y-3 rounded-md border border-zinc-200 bg-white p-4">
            <div>
              <label className="block text-sm font-medium text-zinc-800">
                Хозяйство / ФИО поставщика
              </label>
              <input
                name="supplierName"
                required
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-800">
                Телефон
              </label>
              <input
                name="phone"
                type="tel"
                required
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-800">
                Гос. номер машины
              </label>
              <input
                name="vehiclePlate"
                required
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-800">
                Объём, тонн
              </label>
              <input
                name="volumeTons"
                type="number"
                step="0.1"
                min="0.1"
                required
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-800">
                Комментарий (необязательно)
              </label>
              <input
                name="notes"
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-green-700 px-4 py-3 text-white font-medium hover:bg-green-800"
          >
            Забронировать слот
          </button>
        </form>
      )}
    </div>
  );
}
