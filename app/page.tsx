import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
        Запись в очередь на приём свёклы
      </h1>
      <p className="mt-3 text-zinc-600">
        Выберите способ записи, чтобы не стоять в очереди у ворот.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Link
          href="/book"
          className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:border-[#2a418d] hover:shadow-md"
        >
          <div className="text-xl font-bold uppercase tracking-tight text-[#2a418d]">
            Записаться на время
          </div>
          <p className="mt-2 text-sm text-zinc-600">
            Выберите дату и удобный временной слот заранее.
          </p>
        </Link>

        <Link
          href="/walkin"
          className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:border-[#2a418d] hover:shadow-md"
        >
          <div className="text-xl font-bold uppercase tracking-tight text-[#2a418d]">
            Встать в живую очередь
          </div>
          <p className="mt-2 text-sm text-zinc-600">
            Без предварительной записи — встаньте в очередь на сегодня.
          </p>
        </Link>
      </div>

      <div className="mt-8">
        <Link href="/queue" className="text-sm text-zinc-500 underline">
          Посмотреть табло очереди на сегодня
        </Link>
      </div>
    </div>
  );
}
