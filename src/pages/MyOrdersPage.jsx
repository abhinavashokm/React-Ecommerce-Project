
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyOrders } from "../store/orderSlice";

export default function MyOrders() {
    const {myOrders, loading} = useSelector(store => store.order)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMyOrders())
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Header */}
            <div className="mb-8">

                <h2 className="text-2xl font-semibold">
                    My Orders
                </h2>

                <p className="text-sm text-zinc-500">
                    Products you have purchased
                </p>

            </div>


            {/* Loading */}
            {
                loading ? (
                    <Loading notFullPage={true} />
                ) : myOrders.length === 0 ? (
                    <EmptyState message="You haven't placed any orders yet." />
                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {
                            myOrders.map((order) => {
                                return (
                                    <ProductCard key={order.id} product={order} />
                                )
                            })
                        }

                    </div>

                )
            }

        </div>
    )
}