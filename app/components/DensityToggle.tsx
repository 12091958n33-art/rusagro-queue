"use client";

import { useEffect, useState } from "react";

type Density = "comfortable" | "compact";

const STORAGE_KEY = "density";

export default function DensityToggle() {
  const [density, setDensity] = useState<Density>("comfortable");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "compact" || stored === "comfortable") {
      setDensity(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.density = density;
    localStorage.setItem(STORAGE_KEY, density);
  }, [density]);

  return (
    <div className="flex items-center gap-1 rounded-md border border-zinc-300 p-0.5 text-xs">
      <button
        type="button"
        onClick={() => setDensity("comfortable")}
        className={`rounded px-2 py-1 ${
          density === "comfortable"
            ? "bg-zinc-800 text-white"
            : "text-zinc-600 hover:bg-zinc-100"
        }`}
        title="Обычный режим (для компьютера)"
      >
        Компьютер
      </button>
      <button
        type="button"
        onClick={() => setDensity("compact")}
        className={`rounded px-2 py-1 ${
          density === "compact"
            ? "bg-zinc-800 text-white"
            : "text-zinc-600 hover:bg-zinc-100"
        }`}
        title="Компактный режим (для ноутбука)"
      >
        Ноутбук
      </button>
    </div>
  );
}
