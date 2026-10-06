import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/components/CartProvider";
import DemoNotice from "@/components/DemoNotice";
import "./globals.css";

export const metadata: Metadata = {
  title: "Император64 — презентационный концепт",
  description: "Демонстрация меню, корзины и обработки тестовых заявок. Независимый концепт для презентации; не действующий сайт ресторана.",
  robots: { index: false, follow: false },
  metadataBase: new URL("https://primerimperator.onrender.com"),
};

export const viewport: Viewport = {
  themeColor: "#f6f6f4",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <DemoNotice />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
