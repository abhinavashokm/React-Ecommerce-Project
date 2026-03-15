import { useForm } from "react-hook-form"
import { editProduct, sellProduct } from "../store/productSlice"
import { useDispatch } from "react-redux"
import { uploadProductImage } from "../cloudinary/config"
import toast from "react-hot-toast"
import { useState } from "react"


export default function ProductFormModal({ mode, onClose, prefillData }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      product_name: prefillData?.name,
      price: prefillData?.price,
      description: prefillData?.description,
    }
  })

  const dispatch = useDispatch()
  const [imagePreview, setImagePreview] = useState(prefillData?.imageURL)
  const imageRegister = register("image")

  const postForm = async(data) => {
    const file = data.image[0]
    const imageURL = file ? await uploadProductImage(file) : prefillData?.imageURL

    const reduxThunkFunction = mode === 'edit' ? editProduct : sellProduct
    await dispatch(reduxThunkFunction({ ...data, imageURL, id: prefillData?.id })).unwrap()
  }

  const onSubmit = async (data) => {
    toast.promise((postForm(data)),
      {
        loading: `${mode === 'edit' ? "Saving" : "Adding"} product...`,
        success: `Product ${mode === 'edit' ? "saved" : "added"}!`,
        error: `Failed to ${mode === 'edit' ? "edit" : "add"} product!`
      })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] p-6">

      {/* Modal */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add New Product</h3>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Body */}
        <form className="px-6 py-5 space-y-4 overflow-y-auto">

          {/* Product name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              {...register("product_name")}
              type="text"
              className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Price (₹)
            </label>
            <input
              {...register("price")}
              type="number"
              className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="3"
              className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            ></textarea>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="product-image"
              {...imageRegister}
              onChange={(e) => {
                imageRegister.onChange(e)
                setImagePreview(URL.createObjectURL(e.target.files[0]))
              }}
            />
            <label
              htmlFor="product-image"
              className="border-2 border-dashed border-zinc-300 rounded-xl h-36 flex flex-col items-center justify-center text-zinc-400 cursor-pointer hover:border-orange-400"
            >
              {
                imagePreview ?
                  <img src={imagePreview} alt="" className="h-full w-full object-cover rounded-xl" />
                  :
                  <>
                    <i className="fa-solid fa-camera text-xl mb-2"></i>
                    <p className="text-sm">Click to upload image</p>
                  </>
              }


            </label>
          </div>

        </form>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-zinc-300 rounded-lg font-medium hover:bg-zinc-100"
          >
            Cancel
          </button>

          <button onClick={handleSubmit(onSubmit)} className="flex-1 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600">
            {mode === 'edit' ? "Save Changes" : "Add Product"}
          </button>
        </div>

      </div>
    </div>
  )
}