import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Император64 — суши, роллы и пицца в Саратове",
  description: "Меню, акции и доставка Император64: роллы, сеты, жареные роллы, пицца и вок в Саратове.",
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
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
