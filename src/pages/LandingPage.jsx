import { Link } from "react-router-dom"
import { fetchPublicProducts } from "../store/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import ProductCard from "../components/ProductCard"
import Loading from "../components/Loading"
import { addToCart } from "../store/cartSlice"
import toast from "react-hot-toast"
import EmptyState from "../components/EmptyState"

const LandingPage = () => {
  const dispatch = useDispatch()
  const { publicProducts, loading } = useSelector(store => store.products)

  useEffect(() => {
    dispatch(fetchPublicProducts())
  }, [])

  const handleAddToCart = (product) => {
    toast.promise(
      dispatch(addToCart(product)).unwrap(),
      {
        loading: "Adding to cart...",
        success: "Added to cart",
        error: (err) => {
          if (err.message === "ITEM_ALREADY_IN_CART") {
            return "Item is already in cart!"
          } else if (err.message === "ITEM_MISSING") {
            dispatch(fetchPublicProducts())
            return "Product is unavailable!"
          } else if (err.message === "ITEM_ALREADY_SOLD") {
            dispatch(fetchPublicProducts())
            return "Product already sold!"
          }
          return "Failed to add item!"
        }
      }
    )
  }

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

        </div>


        {/* Product Grid */}
        {
          loading ?
            <Loading notFullPage={true} />
            : publicProducts.length === 0 ?
              <EmptyState />
              :
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

                {/* Product 1 */}
                {
                  publicProducts.map(product => {
                    return (
                      <ProductCard key={product.id} product={product} showAddToCart={true} showSeller={true} handleAddToCart={handleAddToCart} />
                    )
                  })
                }

              </div>
        }


      </div>

    </div>
  )
}

export default LandingPage