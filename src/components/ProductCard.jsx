import { useState } from "react"
import DangerConfirm from "../components/DangerConfirm"
import ProductFormModal from "../components/ProductFormModal"

export default function ProductCard({
  product,
  handleRemoveProduct,
  handleAddToCart,
  showSeller = false,
  showAddToCart = false,
  showActions = false,
  showStatus = true
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const confirmDelete = () => {
    setShowConfirmModal(true)
  }

  const styles = {
    onSale: "bg-green-500",
    sold: "bg-red-500",
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition">
      {
        showConfirmModal && <DangerConfirm onCancel={() => setShowConfirmModal(false)} onConfirm={() => handleRemoveProduct(product.id)} />
      }
      {
        showEditModal &&
        <ProductFormModal
          mode={"edit"}
          onClose={() => setShowEditModal(false)}
          prefillData={product}
        />
      }

      <div className="relative">
        <img
          src={product.imageURL}
          className={`w-full h-40 object-cover`}
        />

        {showStatus && (
          <span className={`absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full ${styles[product.status]}`}>
            {product.status}
          </span>
        )}
      </div>

      <div className="p-4">

        <h3 className="font-semibold">
          {product.name}
        </h3>

        {showSeller && (
          <p className="text-xs text-zinc-400">
            Seller: {product.sellerName}
          </p>
        )}

        <p className="text-sm text-zinc-500">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">

          <span className="text-orange-600 font-semibold">
            ₹{product.price}
          </span>

          <div className="flex gap-2 items-center">

            {showAddToCart && (
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm"
              >
                Add to Cart
              </button>
            )}

            {showActions && product.status !== 'sold' && (
              <div className="flex gap-2 text-zinc-500">

                <button onClick={() => setShowEditModal(true)} className="hover:text-orange-600">
                  <i className="fa-solid fa-pen"></i>
                </button>

                <button
                  onClick={confirmDelete}
                  className="hover:text-red-500"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}