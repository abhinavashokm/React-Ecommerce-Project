import { useEffect, useState } from "react";
import ProductFormModal from "../components/ProductFormModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProducts, removeProduct } from "../store/productSlice";
import Loading from "../components/Loading"
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";

export default function SellPage() {
  const [modal, setModal] = useState(null)
  const { myProducts, loading } = useSelector(store => store.products)
  const dispatch = useDispatch()

  const loadProducts = async () => {
    dispatch(fetchMyProducts())
  }

  const handleRemoveProduct = async (productId) => {
    dispatch(removeProduct(productId))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const addProducts = () => {
    setModal({ mode: 'add' })
  }
  const onClose = () => {
    setModal(null)
  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {
        modal && <ProductFormModal onClose={onClose} />
      }

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-semibold">
            My Listings
          </h2>
          <p className="text-sm text-zinc-500">
            Manage the products you are selling
          </p>
        </div>

        <button onClick={addProducts}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <i className="fa-solid fa-plus"></i>
          Add Product
        </button>

      </div>

      {/* loading spinner */}
      {loading ? <Loading notFullPage={true} />
        : myProducts.length === 0 ?
        <EmptyState/>
        :

        < div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            myProducts.map((product) => {
              return (
                <ProductCard product={product} handleRemoveProduct={handleRemoveProduct} showActions={true} />
              )
            })
          }
        </div>
      }



    </div >
  )
}