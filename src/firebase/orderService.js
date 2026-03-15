import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";
import { updateProductStatus } from "./productService";

export const createOrderService = async (items, userId) => {
    try {
        const batch = writeBatch(db)

        items.forEach(item => {
            const orderRef = doc(collection(db, "orders"))
            batch.set(orderRef, {
                userId,
                productId: item.productId,
                name: item.name,
                price: item.price,
                description: item.description ? item.description : '',
                imageURL: item.imageURL,
                sellerName: item.sellerName ? item.sellerName : '',
                sellerId: item.sellerId ? item.sellerId : ' '
            })
        });

        await batch.commit()

        items.forEach(item => {
            updateProductStatus(item.productId, "sold")
        })

    }catch(error){
        console.log("error while creating order: ", error.message)
    }

}

export const fetchOrderService = async (userId) => {
    const querySnapshot = await getDocs(collection(db, "orders"))
    return querySnapshot.docs.filter(doc => doc.data().userId === userId).map(doc => ({ id: doc.id, ...doc.data() }))
}