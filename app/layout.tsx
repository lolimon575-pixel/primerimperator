import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Император64 — суши, роллы и пицца в Саратове",
  description: "Концепт нового сайта Император64: меню, доставка и удобный заказ суши, роллов и пиццы в Саратове.",
  metadataBase: new URL("https://primerimperator.onrender.com"),
};

export const viewport: Viewport = {
  themeColor: "#080807",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
