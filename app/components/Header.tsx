import Link from "next/link";
import DensityToggle from "@/app/components/DensityToggle";

const links = [
  { href: "/", label: "Главная" },
  { href: "/book", label: "Записаться на время" },
  { href: "/walkin", label: "Живая очередь" },
  { href: "/queue", label: "Табло очереди" },
  { href: "/admin", label: "Диспетчер" },
  { href: "/weighing", label: "Весовая" },
];

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-green-800">
          Русагро · Приём свёклы
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-600 hover:text-green-800 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <DensityToggle />
        </div>
      </div>
    </header>
  );
}
