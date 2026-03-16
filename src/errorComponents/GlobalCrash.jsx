import { Link } from "react-router-dom"

export default function GlobalCrash() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

            <div className="text-center max-w-lg">

                <h1 className="text-5xl font-bold text-red-600 mb-4">
                    App crashed
                </h1>

                <p className="text-gray-600 mb-6">
                    Something unexpected happened and the application couldn't continue.
                    Try refreshing the page or return to the homepage.
                </p>

                <div className="flex justify-center gap-4">

                    <button
                        onClick={() => window.location.reload()}
                        className="px-5 py-2 bg-black text-white rounded-md"
                    >
                        Reload Page
                    </button>

                    <Link
                        to="/"
                        className="px-5 py-2 border border-gray-300 rounded-md"
                    >
                        Go Home
                    </Link>

                </div>

            </div>

        </div>
    )
}