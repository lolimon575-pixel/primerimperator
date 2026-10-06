import type { Metadata } from "next";
import AdminOrders from "@/components/AdminOrders";
export const metadata: Metadata = { title: "Кабинет заявок — Император64", robots: { index: false, follow: false } };
export default function AdminPage() { return <AdminOrders />; }
