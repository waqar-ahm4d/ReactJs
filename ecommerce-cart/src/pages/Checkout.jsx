import CheckoutForm from "../components/checkout/CheckoutForm";

function Checkout() {
  return (
    <>
      <div className="max-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-4xl font-bold">Checkout</h1>
        <CheckoutForm />
      </div>
    </>
  );
}

export default Checkout;
