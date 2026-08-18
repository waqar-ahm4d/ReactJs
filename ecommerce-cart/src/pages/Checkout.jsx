import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import useCartContext from "../hooks/useCartContext";
import { NavLink } from "react-router-dom";
import useCheckout from "../hooks/useCheckout";
import { createOrder } from "../services/order";
import { useState } from "react";
import OrderReview from "../components/checkout/OrderReview";
import PaymentForm from "../components/checkout/PaymentForm";
import OrderConfirmation from "../components/checkout/OrderConfirmation";

function Checkout() {
  const [order, setOrder] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);

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
  }

  async function handlePlaceOrder() {
    setIsCreatingOrder(true);
    setOrderError(null);
    setStep("confirmation");

    try {
      const newOrder = await createOrder({
        form,
        cartItems,
        subtotal,
        shipping,
        discount,
        tax,
        total,
        coupon,
      });
      await setOrder(newOrder);
    } catch (error) {
      console.error("Order creation failed", error);

      setOrderError("We couldn't create your order. Please try again.");
    } finally {
      setIsCreatingOrder(false);
    }
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

        {step === "confirmation" ? (
          <div className="grid lg:max-w-2xl mx-auto">
            <OrderConfirmation
              order={order}
              isCreatingOrder={isCreatingOrder}
              orderError={orderError}
            />
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
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
                onPay={handlePlaceOrder}
              />
            )}
            </div>
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
        )}
      </div>
    </>
  );
}

export default Checkout;
