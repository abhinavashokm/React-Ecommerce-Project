import { addDoc, collection, getDocs, getDoc, deleteDoc, doc, query, where, writeBatch } from "firebase/firestore";
import { db } from "./firebase";

const isProductAvailable = async (productId) => {
    const docRef = doc(db, "products", productId)
    const snap = await getDoc(docRef)
    console.log(snap.exists())
    return snap.exists()
}

const isProductOnSale = async (productId) => {
    const docRef = doc(db, "products", productId)
    const snap = await getDoc(docRef)
    if (!snap.exists()) {
        throw new Error("ITEM_MISSING")
    }
    const data = snap.data()
    return data.status === 'onSale'
}

export const addToCartService = async ({ id, name, price, imageURL, userId, sellerId, sellerName }) => {
    const q1 = query(
        collection(db, "cart"),
        where("userId", "==", userId),
        where("productId", "==", id)
    )
    const cartExitsCheckSnapshot = await getDocs(q1)
    const productAvailble = await isProductAvailable(id)
    const productOnSale = await isProductOnSale(id)

    if (!productAvailble) {
        throw new Error("ITEM_MISSING")
    }

    if (!productOnSale) {
        throw new Error("ITEM_ALREADY_SOLD")
    }

    if (!cartExitsCheckSnapshot.empty) {
        throw new Error("ITEM_ALREADY_IN_CART")
    }

    await addDoc(collection(db, 'cart'), {
        userId,
        productId: id,
        name,
        price,
        imageURL,
        quantity: 1,
        sellerId,
        sellerName,
    })
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
    } catch (error) {
        console.log("error on clear cart: ", error.message)
    }
}