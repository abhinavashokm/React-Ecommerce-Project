import { addDoc, collection, getDocs, deleteDoc, doc, query, where, writeBatch } from "firebase/firestore";
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

export const calculateSubtotal = (items) => {
    if (items.length !== 0) {
        return items.reduce((accum, current) => accum + Number(current.price), 0)
    } else {
        return 0
    }
}

export const clearUserCart = async (userId) => {
    try {
        const q = query(
            collection(db, "cart"),
            where("userId", "==", userId)
        )
        const snapshot = await getDocs(q)
        const batch = writeBatch(db)

        snapshot.forEach((document) => {
            batch.delete(doc(db, "cart", document.id))
        })
        await batch.commit()
    }catch(error){
        console.log("error on clear cart: ", error.message)
    }
}