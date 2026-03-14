import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div>

      {/* Hero */}
      <div className="hero-bg text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Buy & Sell Anything
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-8">
            A simple marketplace for second-hand products near you
          </p>

          <div className="flex justify-center gap-4">

            <Link to={"/sell-products"} className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition">
              <i className="fa-solid fa-plus"></i>
              Sell Now
            </Link >

          </div>

        </div>
      </div>


      {/* Featured Listings */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl font-semibold">
            Featured Listings
          </h2>

          <button className="text-orange-600 text-sm font-medium flex items-center gap-2 hover:underline">
            View all
            <i className="fa-solid fa-arrow-right"></i>
          </button>

        </div>


        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          {/* Product 1 */}
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer">

            <img
              src="https://picsum.photos/400/300"
              className="w-full h-40 object-cover"
            />

            <div className="p-3">

              <h3 className="font-medium text-sm line-clamp-1">
                Apple iPhone 13
              </h3>

              <p className="text-orange-600 font-semibold mt-1">
                ₹45,000
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                Kozhikode
              </p>

            </div>

          </div>


          {/* Product 2 */}
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer">

            <img
              src="https://picsum.photos/401/300"
              className="w-full h-40 object-cover"
            />

            <div className="p-3">

              <h3 className="font-medium text-sm">
                Gaming Laptop RTX 3060
              </h3>

              <p className="text-orange-600 font-semibold mt-1">
                ₹78,000
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                Kochi
              </p>

            </div>

          </div>


          {/* Product 3 */}
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer">

            <img
              src="https://picsum.photos/402/300"
              className="w-full h-40 object-cover"
            />

            <div className="p-3">

              <h3 className="font-medium text-sm">
                Office Chair Ergonomic
              </h3>

              <p className="text-orange-600 font-semibold mt-1">
                ₹6,500
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                Calicut
              </p>

            </div>

          </div>


          {/* Product 4 */}
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer">

            <img
              src="https://picsum.photos/403/300"
              className="w-full h-40 object-cover"
            />

            <div className="p-3">

              <h3 className="font-medium text-sm">
                Sony Wireless Headphones
              </h3>

              <p className="text-orange-600 font-semibold mt-1">
                ₹18,000
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                Trivandrum
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default LandingPage