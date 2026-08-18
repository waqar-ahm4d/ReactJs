function OrderReview({ form, orderSummary, onBack, onContinue }) {
  return (
    <>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Review Your Order</h2>
        {/* Shippping  */}
        <div className="mb-6">
          <h3 className="mb-2 font-medium">Shipping Information</h3>

          <p>
            {form.firstName} {form.lastName}
          </p>
          <p>{form.address}</p>
          <p>
            {form.city}, {form.state}
          </p>
          <p>
            {form.country} {form.postalCode}
          </p>
          <p>{form.phone}</p>
          <p>{form.email}</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border px-5 py-3 font-medium"
          >
            Back
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="rounded-lg bg-black px-5 py-3 font-semibold text-white"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderReview;
