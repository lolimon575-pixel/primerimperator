import { NextRequest } from "next/server";
import { assertOrigin, readJSON, store, orderMode, validSession, sessionCookie, response, failure } from "@/lib/order-service";
import { OrderError, statuses } from "@/lib/order-model";
import type { OrderStatus } from "@/lib/order-model";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
function authorize(request: NextRequest) { if(!validSession(request.cookies.get(sessionCookie)?.value)) throw new OrderError("Войдите в кабинет.", 401); }
export function GET(request: NextRequest) {
  try {
    authorize(request); const status = request.nextUrl.searchParams.get("status") || "all";
    if(status !== "all" && !statuses.includes(status as OrderStatus)) throw new OrderError("Неизвестный фильтр.");
    return response({ mode: orderMode(), ...store().list(orderMode(), status) });
  } catch(error) { return failure(error); }
}
export async function PATCH(request: NextRequest) {
  try {
    authorize(request); assertOrigin(request); const data = await readJSON(request);
    if(typeof data.id !== "string" || !/^[0-9a-f-]{36}$/.test(data.id) || !statuses.includes(data.status as OrderStatus) || !Number.isInteger(data.version)) throw new OrderError("Проверьте данные статуса.");
    const order = store().update(data.id, orderMode(), data.status as OrderStatus, data.version as number);
    return response({ id: order.id, status: order.status, version: order.version });
  } catch(error) { return failure(error); }
}
