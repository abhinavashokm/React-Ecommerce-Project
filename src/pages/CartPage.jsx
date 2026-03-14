export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
        <i className="fa-solid fa-cart-shopping text-orange-500"></i>
        Your Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-4">

          {/* Dummy Item */}
          <div className="bg-white border border-zinc-200 rounded-xl p-5 flex gap-5 items-center">

            <img
              src="https://picsum.photos/100"
              className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                Apple iPhone 13
              </h3>

              <p className="text-sm text-zinc-500">
                Excellent condition • Kozhikode
              </p>

              <div className="mt-2 font-semibold text-orange-600 text-lg">
                ₹45,000
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">

              <button className="w-8 h-8 border rounded-md hover:bg-zinc-100">
                -
              </button>

              <span className="font-medium">
                1
              </span>

              <button className="w-8 h-8 border rounded-md hover:bg-zinc-100">
                +
              </button>

            </div>

            {/* Remove */}
            <button className="text-zinc-400 hover:text-red-500 text-lg">
              <i className="fa-solid fa-trash"></i>
            </button>

          </div>

        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">

          <div className="bg-white border border-zinc-200 rounded-xl p-6 sticky top-24">

            <h3 className="font-semibold text-lg mb-6">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-zinc-600">Subtotal</span>
                <span className="font-medium">₹45,000</span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-600">Delivery</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>

            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹45,000</span>
            </div>

            <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
              Proceed to Checkout
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}