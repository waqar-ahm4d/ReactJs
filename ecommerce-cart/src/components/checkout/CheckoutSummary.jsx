function CheckoutSummary({
  cartItems,
  subtotal,
  shipping,
  discount,
  tax,
  total,
  coupon,
}) {
  return (
    <>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">Order Summary</h2>
        {/* products */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.images[0]}
                alt={item.title}
                className="h-16 w-16 rounded-lg bg-gray-100 object-contain"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{item.title}</p>

                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        {/* price */}
        <div className="my-5">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Discount {coupon && `(${coupon.code})`}
                </span>
                <sspan className="text-red-500">-${discount.toFixed(2)}</sspan>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>${Number(tax.toFixed(2))}</span>
            </div>
          </div>
          <hr className="my-5" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutSummary;
