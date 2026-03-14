export default function CartItem({cartItem, confirmRemoveItem}) {

    return (
        <div className="bg-white border border-zinc-200 rounded-xl p-5 flex gap-5 items-center">

            <img
                src={cartItem.imageURL}
                className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
                <h3 className="font-semibold text-lg">
                    {cartItem.name}
                </h3>

                <p className="text-sm text-zinc-500">
                    Excellent condition • Kozhikode
                </p>

                <div className="mt-2 font-semibold text-orange-600 text-lg">
                    ₹{cartItem.price}
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
            <button onClick={() => confirmRemoveItem(cartItem.id)} className="text-zinc-400 hover:text-red-500 text-lg">
                <i className="fa-solid fa-trash"></i>
            </button>

        </div>
    )
}