import OrderForm from '@/components/OrderForm';

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <div className="mx-auto max-w-xl pt-10">
        <h1 className="mb-8 text-4xl font-black">Ваш заказ</h1>
        <OrderForm />
      </div>
    </main>
  );
}
