export function createOrder({
  form,
  cartItems,
  subtotal,
  shipping,
  discount,
  tax,
  total,
  coupon,
}) {
  return {
    customer: {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    },
    shippingAddress: {
      country: form.country,
      state: form.state,
      city: form.city,
      address: form.address,
      postalCode: form.postalCode,
    },
    items: cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    })),
    pricing: { subtotal: subtotal, shipping, discount, tax, total },
    coupon: coupon
      ? { code: coupon.code, type: coupon.type, value: coupon.value }
      : null,
  };
}
