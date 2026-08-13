function CheckoutForm({formElements}) {
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Contact Information</h2>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formElements.email}
                onChange={(e) =>
                  setForm({
                    ...formElements,
                    email: e.target.value,
                  })
                }
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CheckoutForm;
