import { Percent, Receipt, Tag, Truck } from "lucide-react";
import useCartContext from "../../hooks/useCartContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function SummaryRow({ icon, label, value, valueClassName = "" }) {
  return (
    <>
      <div className="flex justify-between py-1">
        <div className="flex items-center gap-2 text-gray-600">
          {icon && icon}
          <span className="text-gray-600">{label}</span>
        </div>
        <span className={valueClassName}>{value}</span>
      </div>
    </>
  );
}

function CartSummary() {
  const {
    subtotal,
    shipping,
    coupon,
    discount,
    tax,
    total,
    applyCoupon,
    removeCoupon,
    closeCart,
  } = useCartContext();
  const [couponCode, setCouponCode] = useState("");

  function handleApplyCoupon() {
    const success = applyCoupon(couponCode);

    if (success) {
      toast.success("Coupon applied successfully!");
      setCouponCode("");
    } else {
      toast.error("Invalid coupon code");
    }
  }

  function handleRemoveCoupon() {
    removeCoupon();
    toast.info("Coupon removed");
    setCouponCode("");
  }

  return (
    <>
      <div className="rounded-xl border bg-white py-2 px-4 shadow-sm">
        <h2 className="mb-2 text-xl font-bold">Order Summary</h2>
        <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
        <SummaryRow
          icon={<Truck size={18} />}
          label="Shipping"
          value={shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          valueClassName={shipping === 0 ? "font-semibold text-green-600" : ""}
        />
        <SummaryRow
          icon={<Percent size={18} />}
          label="Discount"
          value={`-$${discount.toFixed(2)}`}
          valueClassName="font-medium text-red-500"
        />
        <SummaryRow
          icon={<Receipt size={18} />}
          label="Tax"
          value={`$${tax.toFixed(2)}`}
        />
        <hr className="my-2" />
        <div className="mb-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Coupon Code
          </label>

          <div className="flex gap-2 justify-between items-center">
            <input
              type="text"
              placeholder="Enter coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-black"
            />
            <button
              disabled={!couponCode.trim()}
              onClick={handleApplyCoupon}
              className="rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
          <div className="flex">
            {coupon && (
              <div className="mt-1 w-full flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-2 py-2">
                <div className="flex items-center gap-2">
                  <Tag size={20} />
                  <p className="font-normal text-gray-500 tracking-wide italic text-sm">
                    {coupon.code}
                  </p>
                </div>

                <button
                  onClick={handleRemoveCoupon}
                  className="text-sm font-medium text-red-500 transition hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        <SummaryRow
          label="Total"
          value={`$${total.toFixed(2)}`}
          valueClassName="text-xl font-bold"
        />
      </div>
      <div className="flex flex-col gap-1 mt-1">
        <NavLink onClick={closeCart} to="/checkout" className="text-center w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800">
          Proceed to Checkout
        </NavLink>
        <NavLink
          onClick={closeCart}
          to="/all-products"
          className=" block text-center text-sm text-gray-500 hover:text-black"
        >
          Continue Shopping
        </NavLink>
      </div>
    </>
  );
}

export default CartSummary;
