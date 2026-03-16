import { Link } from "react-router-dom"

export default function ErrorFallback({ message }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">

            <h2 className="text-2xl font-semibold text-red-600">
                Something went wrong
            </h2>

            <p className="text-gray-600 mt-3 max-w-md">
                {message || "We couldn't load this page. Try refreshing or go back to the homepage."}
            </p>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-black text-white rounded-md"
                >
                    Reload Page
                </button>

                <Link
                    to="/"
                    className="px-4 py-2 border border-gray-300 rounded-md"
                >
                    Go Home
                </Link>
            </div>

        </div>
    )
}