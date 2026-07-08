export default function DateForm({
  action,
  date,
}: {
  action: string;
  date: string;
}) {
  return (
    <form action={action} className="flex items-center gap-2">
      <label htmlFor="date" className="text-sm text-zinc-600">
        Дата:
      </label>
      <input
        id="date"
        type="date"
        name="date"
        defaultValue={date}
        className="rounded-md border border-zinc-300 px-2 py-1 text-sm"
      />
      <button
        type="submit"
        className="rounded-md bg-zinc-800 px-3 py-1 text-sm text-white hover:bg-zinc-700"
      >
        Показать
      </button>
    </form>
  );
}
