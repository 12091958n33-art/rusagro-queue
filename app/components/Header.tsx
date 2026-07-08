import Link from "next/link";
import { cookies } from "next/headers";
import { STAFF_AUTH_COOKIE, staffAuthToken } from "@/app/lib/auth";
import { staffLogout } from "@/app/lib/actions";
import BrandBadge from "@/app/components/BrandBadge";

const publicLinks = [
  { href: "/", label: "Главная" },
  { href: "/book", label: "Записаться на время" },
  { href: "/walkin", label: "Живая очередь" },
  { href: "/queue", label: "Табло очереди" },
];

const staffLinks = [
  { href: "/admin", label: "Диспетчер" },
  { href: "/weighing", label: "Весовая" },
];

export default async function Header() {
  const cookieStore = await cookies();
  const isStaff = cookieStore.get(STAFF_AUTH_COOKIE)?.value === (await staffAuthToken());

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <BrandBadge className="h-9 w-9" />
          <span className="flex flex-col leading-none">
            <span className="text-xl font-black uppercase tracking-tight text-zinc-600">
              Русагро
            </span>
            <span className="text-[11px] font-medium text-zinc-500">
              Приём свёклы
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-600 hover:text-[#2a418d] hover:underline"
            >
              {link.label}
            </Link>
          ))}
          {isStaff &&
            staffLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-600 hover:text-[#2a418d] hover:underline"
              >
                {link.label}
              </Link>
            ))}
        </nav>
        <div className="ml-auto text-sm">
          {isStaff ? (
            <form action={staffLogout}>
              <button type="submit" className="text-zinc-500 hover:underline">
                Выйти
              </button>
            </form>
          ) : (
            <Link href="/staff-login" className="text-zinc-500 hover:underline">
              Вход для сотрудников
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
