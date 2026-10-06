import { assertOrigin, readJSON, limited, store, orderMode, response, failure } from "@/lib/order-service";
import { validateOrder, validateKey } from "@/lib/order-model";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    assertOrigin(request); const data = await readJSON(request);
    const key = validateKey(data.idempotencyKey); const order = validateOrder(data, orderMode());
    limited(request, "orders", 30, 600);
    const result = store().create(order, key);
    return response({ id: result.order.id, number: result.order.number, mode: result.order.mode, status: result.order.status, items: result.order.items, total: result.order.total, repeated: result.repeated }, result.repeated ? 200 : 201);
  } catch(error) { return failure(error); }
}
