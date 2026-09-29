import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Император64 — доставка суши в Саратове",
  description: "Свежие роллы и суши с доставкой по Саратову"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
