export default function ProductCard({product, handleRemoveProduct}){

    return (
        <div key={product.id} className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition">

            <img
                src={product.imageURL}
                className="w-full h-40 object-cover"
            />

            <div className="p-4">

                <h3 className="font-semibold">
                    {product.name}
                </h3>

                <p className="text-sm text-zinc-500">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-3">

                    <span className="text-orange-600 font-semibold">
                        ₹{product.price}
                    </span>

                    <div className="flex gap-2 text-zinc-500">

                        <button className="hover:text-orange-600">
                            <i className="fa-solid fa-pen"></i>
                        </button>

                        <button onClick={() => handleRemoveProduct(product.id)} className="hover:text-red-500">
                            <i className="fa-solid fa-trash"></i>
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}