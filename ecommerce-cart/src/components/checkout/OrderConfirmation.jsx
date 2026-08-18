import { Check, CheckCheck, Copy, Loader2 } from "lucide-react";
import { useState } from "react";

function OrderConfirmation({ order, isCreatingOrder}) {
  const [copied, setCopied] = useState(false);

  async function handleCopyOrderId() {
    try {
      await navigator.clipboard.writeText(order.id);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log("Failed to copy", error);
    }
  }

  if (isCreatingOrder) {
    return (
      <>
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Loader2 size={32} className="max-auto animate-spin" />
          </div>
          <p className="mt-2 text-gray-600">Creating Order...</p>
        </div>
      </>
    );
  }

  if (!order) {
    return null;
  }
  return (
    <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCheck size={32} />
      </div>

      <h1 className="text-2xl font-bold">Order Confirmed!</h1>

      <p className="mt-2 text-gray-600">Thank you for your purchase.</p>

      <div className="mt-6 rounded-lg bg-gray-50 p-5 text-left">
        <p className="text-sm text-gray-500">Order Number:</p>

        <div className="mt-1 flex items-center gap-2">
          <p className="mt-1 font-semibold">{order.id}</p>

          <button
            type="button"
            className="rounded-md p-1.5 text-gray-500 transition hover:bg-gray-200 hover:text-black"
            onClick={handleCopyOrderId}
          >
            {copied ? <Check size={32} /> : <Copy size={32} />}
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">Total:</p>

        <p className="mt-1 text-xl font-bold">
          ${Number(order.pricing.total.toFixed(2))}
        </p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
