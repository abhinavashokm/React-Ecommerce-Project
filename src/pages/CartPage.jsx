import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyCart, removeFromCart } from "../store/cartSlice";
import Loading from "../components/Loading"
import toast from "react-hot-toast";
import EmptyState from "../components/EmptyState";
import { Link } from "react-router-dom";
import { calculateSubtotal } from "../firebase/cartService";

export default function CartPage() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector(store => store.cart)
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    dispatch(fetchMyCart())
  }, [])

  useEffect(() => {
    setSubtotal(calculateSubtotal(items))
  }, [items])

  const removeCartItem = async (cartItemId) => {
    toast.promise(
      dispatch(removeFromCart(cartItemId)),
      {
        loading: "removing from cart...",
        success: "Item removed from cart.",
        error: "Failed to remove Item!"
      }
    )
  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
        <i className="fa-solid fa-cart-shopping text-orange-500"></i>
        Your Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        < div className="lg:col-span-8 space-y-4">
          {
            loading ?
              <Loading notFullPage={true} />
              : items.length === 0 ?
                <EmptyState />
                :
                items.map(cartItem => {
                  return (<CartItem key={cartItem.id} cartItem={cartItem} removeCartItem={removeCartItem} />)
                })


          }
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
                <span className="font-medium">₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-600">Delivery</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>

            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>

            <Link to="/checkout" className=" inline-flex items-center justify-center mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
              Proceed to Checkout
            </Link>

          </div>

        </div>

      </div>
    </div >
  )
}