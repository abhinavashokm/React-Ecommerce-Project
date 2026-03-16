import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";


export default function MainLayout() {
    const { user, loading } = useSelector(store => store.auth)

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to={"/login"} replace />
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}