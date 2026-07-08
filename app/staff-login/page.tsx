import { staffLogin } from "@/app/lib/actions";

export default async function StaffLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const next = params.next || "/admin";

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-xl font-extrabold uppercase tracking-tight text-zinc-900">Вход для сотрудников</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Введите PIN-код, чтобы попасть в диспетчерскую или на весовую.
      </p>

      {params.error && (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          Неверный PIN-код, попробуйте ещё раз.
        </p>
      )}

      <form action={staffLogin} className="mt-6 space-y-3">
        <input type="hidden" name="next" value={next} />
        <div>
          <label className="block text-sm font-medium text-zinc-800">
            PIN-код
          </label>
          <input
            name="pin"
            type="password"
            inputMode="numeric"
            autoFocus
            required
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[#2a418d] px-4 py-2 text-sm font-bold uppercase tracking-tight text-white hover:bg-[#1d2f66]"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
