
export const uploadProductImage = async (file) => {

  const formData = new FormData()

  formData.append("file", file)
  formData.append("upload_preset", "product_images")

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dlrul7eet/image/upload",
    {
      method: "POST",
      body: formData
    }
  )

  const data = await res.json()

  return data.secure_url
}