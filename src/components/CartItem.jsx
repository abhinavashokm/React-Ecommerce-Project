import { useState } from "react"
import DangerConfirm from "./DangerConfirm"

export default function CartItem({ cartItem, removeCartItem }) {
    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <div className="bg-white border border-zinc-200 rounded-xl p-5 flex gap-5 items-center">
            {
                showConfirm && <DangerConfirm onConfirm={() => removeCartItem(cartItem.id)} onCancel={() => setShowConfirm(false)} />
            }

            <img
                src={cartItem.imageURL}
                className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
                <h3 className="font-semibold text-lg">
                    {cartItem.name}
                </h3>

                <p className="text-sm text-zinc-500">
                    {cartItem.description}
                </p>

                <div className="mt-2 font-semibold text-orange-600 text-lg">
                    ₹{cartItem.price}
                </div>
            </div>

            {/* Remove */}
            <button onClick={() => setShowConfirm(true)} className="text-zinc-400 hover:text-red-500 text-lg">
                <i className="fa-solid fa-trash"></i>
            </button>

        </div>
    )
}