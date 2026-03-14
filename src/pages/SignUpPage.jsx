import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase/firebase"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

export default function SignUpPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const createAccount = async (e) => {
        e.preventDefault()
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(userCredentials.user, {
                displayName: name
            })
            toast.success("Signup Successful")
        } catch (error) {
            toast.error("Something went wrong")
            console.log("error on signup: ", error.message)
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">

            {/* Logo */}
            <div className="flex justify-center mb-6">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    B
                </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-1">
                Create account
            </h2>

            <p className="text-sm text-zinc-500 text-center mb-6">
                Join Bazaar in seconds
            </p>

            {/* Form */}
            <form onSubmit={(e) => createAccount(e)} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Abhinav K"
                        className="w-full border border-zinc-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg px-4 py-2.5 outline-none transition"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="you@email.com"
                        className="w-full border border-zinc-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg px-4 py-2.5 outline-none transition"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border border-zinc-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg px-4 py-2.5 outline-none transition"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition"
                >
                    Create account
                </button>

            </form>

            {/* Footer */}
            <div className="text-center mt-5 text-sm">
                <span className="text-zinc-500">
                    Already have an account?
                </span>

                <Link to={"/login"} className="text-orange-600 font-semibold ml-2 hover:underline">
                    Login
                </Link >
            </div>

        </div>
    )
}