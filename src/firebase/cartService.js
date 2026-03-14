import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const addToCartService = async ({ id, name, price, imageURL, userId }) => {
    try {
        await addDoc(collection(db, 'cart'), {
            userId,
            productId: id,
            name,
            price,
            imageURL,
            quantity: 1
        })
    } catch (error) {
        console.log("something went wrong on addToCart Service")
    }
}

export const fetchUserCartService = async (userId) => {
    const querySnapshot = await getDocs(collection(db, 'cart'))
    return querySnapshot.docs.filter(cartItem => cartItem.data().userId = userId).map(cartItem => ({ id: cartItem.id, ...cartItem.data() }))
}

export const deleteFromCartService = async (itemId) => {
    await deleteDoc(doc(db, "cart", itemId))
}