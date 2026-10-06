"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole, LogOut, RefreshCw, ShoppingBag } from "lucide-react";
import type { StoredOrder } from "@/lib/order-store";
import type { OrderStatus } from "@/lib/order-model";

const labels: Record<OrderStatus, string> = { new: "Новая", confirmed: "Подтверждена", preparing: "Готовится", ready: "Готова", completed: "Завершена", cancelled: "Отменена" };
const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = { new: "confirmed", confirmed: "preparing", preparing: "ready", ready: "completed" };
const actionLabel: Partial<Record<OrderStatus, string>> = { new: "Подтвердить", confirmed: "Начать готовить", preparing: "Готово", ready: "Завершить" };
const money = (value: number) => value.toLocaleString("ru-RU") + " ₽";

export default function AdminOrders() {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({ all: 0 });
  const [filter, setFilter] = useState("all");
  const [mode, setMode] = useState<"demo" | "live">("demo");
  const [updating, setUpdating] = useState<string | null>(null);
  const [refreshed, setRefreshed] = useState("");
  const generation = useRef(0);
  const load = useCallback(async () => {
    const current = ++generation.current;
    try {
      const response = await fetch("/api/admin/orders?status=" + filter, { cache: "no-store" });
      if (current !== generation.current) return;
      if (response.status === 401) { setAuthorized(false); setOrders([]); setCounts({all:0}); return; }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Не удалось загрузить заявки.");
      setAuthorized(true); setOrders(data.orders); setCounts(data.counts); setMode(data.mode); setError(""); setRefreshed(new Date().toLocaleTimeString("ru-RU", {hour:"2-digit",minute:"2-digit"}));
    } catch(error) { if(current === generation.current) setError(error instanceof Error ? error.message : "Нет связи с кабинетом."); }
    finally { if(current === generation.current) setChecking(false); }
  }, [filter]);
  useEffect(() => { void load(); const interval = setInterval(() => { if(!document.hidden) void load(); }, 30000); return () => { ++generation.current; clearInterval(interval); }; }, [load]);
  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if(busy) return; setBusy(true); setError("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/admin/session", { method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:new FormData(form).get("password")}) });
      const data = await response.json(); if(!response.ok) throw new Error(data.error || "Не удалось войти.");
      form.reset(); await load();
    } catch(error) { setError(error instanceof Error ? error.message : "Не удалось войти."); }
    finally { setBusy(false); }
  };
  const logout = async () => {
    try {
      const response = await fetch("/api/admin/session", {method:"DELETE"});
      if(!response.ok) throw new Error(); ++generation.current;setAuthorized(false);setOrders([]);setCounts({all:0});setError("");
    } catch { setError("Не удалось завершить сеанс. Повторите выход."); }
  };
  const update = async (order: StoredOrder, status: OrderStatus) => {
    if(updating) return; setUpdating(order.id); setError("");
    try {
      const response = await fetch("/api/admin/orders", {method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:order.id,status,version:order.version})});
      const data = await response.json();if(!response.ok) throw new Error(data.error || "Не удалось изменить статус.");await load();
    } catch(error) { setError(error instanceof Error ? error.message : "Сохранение статуса не подтверждено."); }
    finally { setUpdating(null); }
  };
  return <main className="min-h-screen bg-[#f6f6f4] pb-12 text-[#1f1f1f]">
    <header className="sticky top-0 z-30 border-b border-black/[0.06] bg-white/95 backdrop-blur"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"><Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#777]"><ArrowLeft size={16}/>На сайт</Link><strong className="text-sm">Кабинет заявок</strong>{authorized ? <button onClick={() => void logout()} className="inline-flex h-10 items-center gap-2 rounded-full bg-[#f3f3f1] px-3 text-xs font-medium"><LogOut size={15}/><span className="hidden sm:block">Выйти</span></button> : <LockKeyhole size={17} className="text-[#999]"/>}</div></header>
    {!authorized ? <section className="mx-auto mt-10 max-w-md px-4"><form onSubmit={login} className="rounded-[28px] bg-white p-7 shadow-sm"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff0ec] text-[#d83e26]"><LockKeyhole size={22}/></div><h1 className="mt-5 text-2xl font-bold tracking-tight">Вход администратора</h1><p className="mt-2 text-sm leading-6 text-[#888]">Доступ к заявкам защищён отдельным паролем.</p><label className="mt-6 block text-xs font-medium text-[#777]">Пароль<input name="password" type="password" autoComplete="current-password" required maxLength={300} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f8f6] px-4 py-3 text-sm outline-none focus:border-[#d83e26]"/></label>{error && <p role="alert" className="mt-4 text-sm leading-6 text-[#b04b34]">{error}</p>}<button disabled={busy || checking} type="submit" className="mt-5 h-12 w-full rounded-full bg-[#d83e26] text-sm font-semibold text-white disabled:opacity-50">{checking ? "Проверяем сеанс…" : busy ? "Входим…" : "Войти"}</button><p className="mt-4 text-xs leading-5 text-[#aaa]">В демонстрации используются вымышленные контакты гостей.</p></form></section> : <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-[#d83e26]">{mode === "demo" ? "Демо-кабинет" : "Приём заявок"}</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Заявки и подтверждения</h1></div><button onClick={() => void load()} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold shadow-sm"><RefreshCw size={15}/>Обновить</button></div>
      {mode === "demo" && <div className="mt-5 rounded-2xl bg-[#fff0e9] p-4 text-xs leading-5 text-[#a24c32]"><strong>Тестовые заявки.</strong> Они не поступают в настоящий ресторан. Суммы не являются выручкой. Демо-данные очищаются через сутки или при перезапуске демонстрации.</div>}
      <div className="mt-5 grid grid-cols-3 gap-3"><div className="rounded-2xl bg-white p-4"><p className="text-[11px] text-[#999]">Всего заявок</p><strong className="mt-1 block text-2xl">{counts.all}</strong></div><div className="rounded-2xl bg-white p-4"><p className="text-[11px] text-[#999]">Ждут подтверждения</p><strong className="mt-1 block text-2xl text-[#d83e26]">{counts.new || 0}</strong></div><div className="rounded-2xl bg-white p-4"><p className="text-[11px] text-[#999]">В работе</p><strong className="mt-1 block text-2xl">{(counts.confirmed||0)+(counts.preparing||0)+(counts.ready||0)}</strong></div></div>
      <div className="mt-6 flex items-center justify-between gap-3"><label className="flex min-w-0 items-center gap-2 text-xs text-[#777]">Показать<select value={filter} onChange={event=>setFilter(event.target.value)} className="min-w-0 rounded-full border border-black/10 bg-white px-3 py-2.5 text-xs font-medium"><option value="all">Все статусы</option>{Object.entries(labels).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label><span className="text-[10px] text-[#999]">Обновлено {refreshed}</span></div>
      {error && <div role="alert" className="mt-4 rounded-2xl bg-[#fff1ed] p-4 text-sm leading-6 text-[#a64732]">{error}</div>}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">{orders.map(order=><article key={order.id} className="overflow-hidden rounded-[24px] border border-black/[0.05] bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><strong className="block text-sm">{order.number}</strong><span className="text-[11px] text-[#999]">{new Date(order.createdAt).toLocaleString("ru-RU",{timeZone:"Europe/Saratov",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})} · Саратов</span></div><span className={"rounded-full px-3 py-1.5 text-[11px] font-semibold "+(order.status==="new"?"bg-[#fff0e8] text-[#d75a36]":"bg-[#f2f4ee] text-[#6e7b63]")}>{labels[order.status]}</span></div><div className="mt-4 flex items-baseline justify-between gap-3"><span className="text-xs text-[#777]">{order.fulfillment==="delivery"?"Доставка":order.pickupPoint}</span><strong className="whitespace-nowrap text-xl">{money(order.total)}</strong></div><div className="mt-3 max-h-40 space-y-2 overflow-y-auto overscroll-contain rounded-2xl bg-[#f8f8f6] p-3">{order.items.map(item=><div key={item.id} className="flex justify-between gap-3 text-xs"><span>{item.name} × {item.quantity}</span><span className="shrink-0 text-[#888]">{money(item.price*item.quantity)}</span></div>)}</div><div className="mt-4 text-xs leading-6 text-[#777]"><strong className="text-[#333]">{order.customer.name}</strong>{mode === "live" && <> · <a href={"tel:"+order.customer.phone} className="text-[#d83e26]">{order.customer.phone}</a></>}<p>{order.fulfillment==="delivery"?order.customer.address:"Самовывоз"} · {order.timeMode==="scheduled"?"К "+order.scheduledTime:"Как можно скорее"}</p><p>{order.customer.comment}</p></div><div className="mt-4 flex gap-2 border-t border-black/[0.06] pt-4">{nextStatus[order.status] && <button disabled={updating!==null} onClick={()=>void update(order,nextStatus[order.status]!)} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-[#1f1f1f] px-3 text-xs font-semibold text-white disabled:opacity-50">{updating===order.id?"Сохраняем…":actionLabel[order.status]}<ArrowRight size={14}/></button>}{!["completed","cancelled"].includes(order.status) && <button disabled={updating!==null} onClick={()=>{if(window.confirm("Отменить заявку "+order.number+"?"))void update(order,"cancelled");}} className="h-10 rounded-full bg-[#f3f3f1] px-4 text-xs font-medium text-[#777] disabled:opacity-50">Отменить</button>}{order.status==="completed"&&<span className="inline-flex items-center gap-2 text-xs text-[#6e7b63]"><CheckCircle2 size={15}/>Завершено</span>}</div></article>)}</div>
      {!orders.length && <div className="mt-4 rounded-[24px] bg-white px-6 py-12 text-center"><ShoppingBag size={28} className="mx-auto text-[#bbb]"/><h2 className="mt-4 text-lg font-semibold">Заявок с этим статусом пока нет</h2><p className="mt-2 text-sm text-[#999]">{mode==="demo"?"Создайте тестовую заявку через меню и оформление.":"Новые заявки появятся после отправки с сайта."}</p><Link href="/menu" className="mt-4 inline-flex rounded-full bg-[#d83e26] px-5 py-3 text-xs font-semibold text-white">Открыть меню</Link></div>}
      <p className="mt-4 text-[11px] leading-5 text-[#aaa]">Показываются последние 40 заявок выбранного статуса. Список обновляется каждые 30 секунд, когда вкладка открыта.</p>
    </section>}
  </main>;
}
