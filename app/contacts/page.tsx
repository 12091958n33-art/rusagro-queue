const MAP_QUERY = "Знаменский сахарный завод, Тамбовская область, рп Знаменка, Рабочая улица, 2";

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-extrabold uppercase tracking-tight text-zinc-900">
        Контакты
      </h1>
      <p className="mt-1 text-sm text-zinc-600">
        Сахарное бизнес-направление — Тамбов
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="space-y-3 rounded-md border border-zinc-200 bg-white p-5 text-sm">
          <div className="text-base font-bold text-zinc-900">
            ООО «Русагро-Тамбов»
          </div>
          <div>
            <div className="text-xs uppercase text-zinc-500">Адрес</div>
            <div className="text-zinc-800">
              393401, Тамбовская область, р.п. Знаменка, ул. Рабочая, 2
            </div>
          </div>
          <div>
            <div className="text-xs uppercase text-zinc-500">Телефон</div>
            <a
              href="tel:+74752422401"
              className="text-[#2a418d] hover:underline"
            >
              +7 4752 42 2401
            </a>
          </div>
          <div>
            <div className="text-xs uppercase text-zinc-500">Эл. почта</div>
            <a
              href="mailto:znamenka@rusagrogroup.ru"
              className="text-[#2a418d] hover:underline"
            >
              znamenka@rusagrogroup.ru
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-zinc-200">
          <iframe
            title="Карта — ООО «Русагро-Тамбов»"
            src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(MAP_QUERY)}&z=16`}
            className="h-full min-h-[260px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
