import { db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const addProduct = async ({ product_name, price, description, sellerId, imageURL }) => {
    try {
        await addDoc(collection(db, 'products'), {
            name: product_name,
            price: price,
            description: description,
            sellerId: sellerId,
            imageURL: imageURL
        })
        console.log(product_name, price, description)
    } catch (error) {
        console.log(error)
    }
}

export const fetchProductsOfSeller = async (sellerId) => {
    const querySnapshot = await getDocs(collection(db, 'products'))
    return querySnapshot.docs.filter(doc => sellerId === doc.data().sellerId).map(doc =>  ({ id: doc.id, ...doc.data() }))
}

export const deleteProduct = async (productId) => {
    await deleteDoc(doc(db, "products", productId))
}
