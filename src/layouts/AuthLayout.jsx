import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

export default function AuthLayout() {
    const { user, loading } = useSelector(store => store.auth)

    if (loading) {
        return <Loading />
    }

    if (user) {
        return <Navigate to={"/"} />
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex items-center justify-center">
                <Outlet />
            </main>
        </div>
    )
}