import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import DensityToggle from "@/app/components/DensityToggle";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Русагро — Очередь на приём свёклы",
  description: "Запись поставщиков в очередь на сдачу свёклы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${roboto.variable} h-full antialiased`}
      data-density="comfortable"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.density=localStorage.getItem("density")||"comfortable"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50">
        <Header />
        <main className="flex-1">{children}</main>
        <DensityToggle />
      </body>
    </html>
  );
}
