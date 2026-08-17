import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import useCartContext from "../hooks/useCartContext";

function Checkout() {
  const { cartItems, subtotal, shipping, discount, tax, total, coupon } =
    useCartContext();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <CheckoutForm />
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
