import { useState } from "react";

function PaymentForm({ onBack, onPay }) {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Payment</h2>
        {/* Payment method */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-gray-700">
            Payment Method
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`rounded-lg border p-4 text-left transition ${paymentMethod === "card" ? "border-black ring-1 ring-black" : "border-gray-300"}`}
            >
              <p className="font-medium">Credit/Debit Card</p>
              <p className="mt-1 text-sm text-gray-500">
                Pay securely with your card
              </p>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("cod")}
              className={`rounded-lg border p-4 text-left transition ${paymentMethod === "cod" ? "border-black ring-1 ring-black" : "border-gray-300"}`}
            >
              <p className="font-medium">Cash on Delivery</p>
              <p className="mt-1 text-sm text-gray-500">
                Pay when your order arrives
              </p>
            </button>
          </div>
        </div>
        {/* Card fields  */}
        {paymentMethod === "card" && (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="cardNumber"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="expiry"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Expiry Date
                </label>

                <input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  CVV
                </label>

                <input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>
        )}
        {/* Actions  */}
        <div className="mt-8 flex gap-3">
          <button
            className="rounded-lg border px-5 py-3 font-medium"
            type="button"
            onClick={onBack}
          >
            Back
          </button>

          <button
            type="button"
            onClick={onPay}
            className="flex-1 rounded-lg bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentForm;
