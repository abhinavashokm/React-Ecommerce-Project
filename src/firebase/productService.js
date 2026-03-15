import { db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export const addProduct = async ({ product_name, price, description, sellerId, sellerName, imageURL }) => {
    try {
        await addDoc(collection(db, 'products'), {
            name: product_name,
            price: price,
            description: description,
            sellerId: sellerId,
            sellerName: sellerName,
            imageURL: imageURL,
            status: "onSale"
        })
    } catch (error) {
        console.log("error on adding product : ", error)
    }
}

export const editProductService = async ({ id, product_name, price, description, imageURL }) => {
    try {
        const docRef = doc(db, "products", id)
        await updateDoc(docRef, {
            name: product_name,
            price: price,
            description: description,
            imageURL: imageURL
        })
    } catch (error) {
        console.log("error on edit product: ", error.message)
    }
}

export const updateProductStatus = async (productId, status) => {
    try {
        const docRef = doc(db, "products", productId)
        await updateDoc(docRef, {
            status: status
        })
    } catch (error) {
        console.log("error on update product status: ", error.message)
    }
}

export const fetchProductsOfSeller = async (sellerId) => {
    const querySnapshot = await getDocs(collection(db, 'products'))
    return querySnapshot.docs.filter(doc => sellerId === doc.data().sellerId).map(doc => ({ id: doc.id, ...doc.data() }))
}

export const deleteProduct = async (productId) => {
    await deleteDoc(doc(db, "products", productId))
}

export const fetchOtherUsersProducts = async (userId) => {
    const querySnapshot = await getDocs(collection(db, 'products'))
    return querySnapshot.docs.filter(doc => userId !== doc.data().sellerId).map(doc => ({ id: doc.id, ...doc.data() }))
}
