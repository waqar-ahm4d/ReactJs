import { useRef, useState } from "react";
import CheckoutForm from "../components/checkout/CheckoutForm";
import { validatePhone } from "../services/validatePhone";

const initialCheckout = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  country: "",
  state: "",
  city: "",
  address: "",
  postalCode: "",
};

function Checkout() {
  const [form, setForm] = useState(initialCheckout);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = useRef({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // setErrors(prev => ({...prev, [name]: ""}))
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstError = Object.keys(validationErrors)[0];

      const firstErrorInput = inputRefs.current[firstError];

      firstErrorInput?.focus({ preventScroll: true });

      firstErrorInput?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }
    setErrors({});

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Processing complete");
    }, 2000);
  }

  function validateForm() {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid Email";
    }

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!form.country) {
      newErrors.phone = "Please select a country first";
    } else {
      const phoneError = validatePhone(form.phone, form.country);

      if (phoneError) {
        newErrors.phone = phoneError;
      }
    }

    // else if (form.phone.trim().length < 11) {
    //   newErrors.phone = "Invalid Phone Number";
    // }

    if (!form.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State / Province is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);

    // return Object.keys(newErrors).length === 0;
    return newErrors;
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <form
            noValidate
            onSubmit={handleSubmit}
            className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2"
          >
            <h2 className="mb-6 text-xl font-semibold">Contact Information</h2>

            <div className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  ref={(element) => {
                    inputRefs.current.email = element;
                  }}
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-1 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <h2 className="mb-6 mt-10 text-xl font-semibold">
              Shipping Address
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  ref={(element) => {
                    inputRefs.current.firstName = element;
                  }}
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-1 ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />

                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  ref={(element) => {
                    inputRefs.current.lastName = element;
                  }}
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-1 ${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />

                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  ref={(element) => {
                    inputRefs.current.phone = element;
                  }}
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-1 ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />

                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Country
                </label>

                {/* <input
                  id="country"
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-1 ${
                    errors.country
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                /> */}
                <select
                  ref={(element) => {
                    inputRefs.current.country = element;
                  }}
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-1 ${
                    errors.country
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                >
                  <option value="">Select Country</option>
                  <option value="PK">Pakistan</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="IN">India</option>
                </select>

                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>

                <input
                  ref={(element) => {
                    inputRefs.current.state = element;
                  }}
                  id="state"
                  name="state"
                  type="text"
                  value={form.state}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-1 ${
                    errors.state
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />

                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Street Address
                </label>

                <input
                  ref={(element) => {
                    inputRefs.current.address = element;
                  }}
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-1 ${
                    errors.address
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />

                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  City
                </label>

                <input
                  ref={(element) => {
                    inputRefs.current.city = element;
                  }}
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-1 ${
                    errors.city
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />

                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                )}
              </div>

              {/* Postal Code */}
              <div>
                <label
                  htmlFor="postalCode"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>

                <input
                  ref={(element) => {
                    inputRefs.current.postalCode = element;
                  }}
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={form.postalCode}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-1 ${
                    errors.postalCode
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />

                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.postalCode}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="mt-8 w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 sm:w-auto disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Continue to Payment"}
            </button>
          </form>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold">Order Summary</h2>

              <p className="text-gray-600">
                Your cart summary will appear here.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default Checkout;
