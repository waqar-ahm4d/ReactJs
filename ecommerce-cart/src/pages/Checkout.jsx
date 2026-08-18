import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import useCartContext from "../hooks/useCartContext";
import { NavLink } from "react-router-dom";
import useCheckout from "../hooks/useCheckout";
import { createOrder } from "../services/order";
import { useState } from "react";
import OrderReview from "../components/checkout/OrderReview";
import PaymentForm from "../components/checkout/PaymentForm";

function Checkout() {
  const [step, setStep] = useState("information");

  const { cartItems, subtotal, shipping, discount, tax, total, coupon } =
    useCartContext();

  const {
    form,
    errors,
    isSubmitting,
    inputRefs,
    handleChange,
    validateAndSubmit,
  } = useCheckout();

  function handleOrderSubmit(e) {
    e.preventDefault();

    const isValid = validateAndSubmit();

    if (!isValid) return;

    setStep("review");

    // const order = createOrder({
    //   form,
    //   cartItems,
    //   subtotal,
    //   shipping,
    //   discount,
    //   tax,
    //   total,
    //   coupon,
    // });
    // console.log("Order", order);
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-lg rounded-xl border bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>

          <p className="mt-3 text-gray-600">
            \ Add some products to your cart before proceeding to checkout.
          </p>

          <NavLink
            to="/all-products"
            className="inline-block mt-4 text-center w-full rounded-lg bg-black py-3 px-2 font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </NavLink>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          {step === "information" && (
            <CheckoutForm
              form={form}
              errors={errors}
              isSubmitting={isSubmitting}
              inputRefs={inputRefs}
              handleChange={handleChange}
              handleSubmit={handleOrderSubmit}
            />
          )}
          {step === "review" && (
            <OrderReview
              form={form}
              onBack={() => setStep("information")}
              onContinue={() => setStep("payment")}
            />
          )}
          {step === "payment" && (
            <PaymentForm
              onBack={() => setStep("review")}
              onPay={() => setStep("confirmation")}
            />
          )}
          {/* Order Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <CheckoutSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              tax={tax}
              total={total}
              coupon={coupon}
            />
          </aside>
        </div>
      </div>
    </>
  );
}

export default Checkout;
