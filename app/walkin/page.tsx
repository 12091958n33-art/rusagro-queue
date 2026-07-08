import { joinWalkinQueue } from "@/app/lib/actions";
import { todayIso } from "@/app/lib/types";

export default function WalkinPage() {
  const date = todayIso();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-zinc-900">Живая очередь</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Запись без предварительной брони на сегодня, {date}. Вы встанете в
        конец текущей очереди.
      </p>

      <form action={joinWalkinQueue} className="mt-8 space-y-3 rounded-md border border-zinc-200 bg-white p-4">
        <input type="hidden" name="date" value={date} />

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

        <button
          type="submit"
          className="w-full rounded-md bg-green-700 px-4 py-3 text-white font-medium hover:bg-green-800"
        >
          Встать в очередь
        </button>
      </form>
    </div>
  );
}
