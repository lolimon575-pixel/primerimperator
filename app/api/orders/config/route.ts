import { orderMode, storageConfig, response } from "@/lib/order-service";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function GET() {
  let available = true; try { storageConfig(); } catch { available = false; }
  return response({ mode: orderMode(), available });
}
