import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchMyCart } from "../store/cartSlice"
import Loading from "../components/Loading"
import { calculateSubtotal } from "../firebase/cartService"
import { addOrder } from "../store/orderSlice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function CheckoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, loading } = useSelector(store => store.cart)
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    dispatch(fetchMyCart())
  }, [])

  useEffect(() => {
    setSubtotal(calculateSubtotal(items))
  }, [items])

  const createOrderHandler = () => {
    const promise = dispatch(addOrder(items)).unwrap()
    toast.promise(promise, {
      pending: "Creating order...",
      success: "Order created",
      error: "Failed to create order!"
    })

    promise.then(() => navigate("/my-orders"))
  }
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-8">
        Checkout
      </h2>

      <div className="bg-white border border-zinc-200 rounded-xl p-6">

        {/* Items */}
        <div className="space-y-4 mb-8">

          {
            loading ?
              <Loading notFullPage={true} />
              : items.length === 0 ?
                <EmptyState />
                :
                items.map(cartItem => {
                  return (

                    <div key={cartItem.id} className="flex items-center gap-4 border-b pb-4">

                      <img
                        src={cartItem.imageURL}
                        className="w-16 h-16 rounded-md object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-medium">
                          {cartItem.name}
                        </p>
                        <p className="text-sm text-zinc-500">
                          {cartItem.description}
                        </p>
                      </div>

                      <span className="font-semibold text-orange-600">
                        ₹{cartItem.price}
                      </span>

                    </div>
                  )
                })
          }



        </div>


        {/* Price Summary */}
        <div className="space-y-3 text-sm mb-6">

          <div className="flex justify-between">
            <span className="text-zinc-600">Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-600">Delivery</span>
            <span className="text-emerald-600 font-medium">Free</span>
          </div>

        </div>

        <hr className="my-5" />

        <div className="flex justify-between text-lg font-semibold mb-8">
          <span>Total Payable</span>
          <span>₹{subtotal}</span>
        </div>


        {/* Address */}
        {/* <div className="mb-8">

          <h3 className="font-medium mb-3">
            Delivery Address
          </h3>

          <div className="bg-zinc-100 rounded-lg p-4 text-sm leading-relaxed">
            <p className="font-medium">Abhinav K</p>
            <p>Kozhikode, Kerala 673001</p>
            <p className="text-zinc-600">+91 9876543210</p>
          </div>

        </div> */}

        {/* Payment Button */}
        <button onClick={createOrderHandler} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition">
          Buy Now • Cash on Delivery
        </button>

        <p className="text-center text-xs text-zinc-500 mt-4">
          Secure checkout • Pay when the product arrives
        </p>

      </div>

    </div>
  )
}