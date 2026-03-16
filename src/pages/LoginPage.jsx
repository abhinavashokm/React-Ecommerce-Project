import { auth } from "../firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { useState } from "react"
import { useForm } from "react-hook-form"
import FormError from "../components/FormError"

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const signIn = async (data) => {
        toast.promise(signInWithEmailAndPassword(auth, data.email, data.password), {
            loading: "Loggin in..",
            success: 'Login successful',
            error: "Login failed!"
        })
    }
    return (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">

            <div className="flex justify-center mb-6">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                    B
                </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-1">
                Welcome back
            </h2>

            <p className="text-sm text-zinc-500 text-center mb-6">
                Login to your Bazaar account
            </p>

            <form onSubmit={handleSubmit(signIn)} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="you@email.com"
                        {...register("email", {
                            required: "email is required",
                            setValueAs: v => v.toLowerCase().trim(),
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address"
                            }
                        })}
                        className="w-full border border-zinc-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg px-4 py-2.5 outline-none transition"
                    />
                    {errors.email && <FormError msg={errors.email.message} />}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        {...register("password", {
                            required: "password is required",
                        })}
                        className="w-full border border-zinc-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg px-4 py-2.5 outline-none transition"
                    />
                    {errors.password && <FormError msg={errors.password.message} />}
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition"
                >
                    Login
                </button>

            </form>

            <div className="text-center mt-5 text-sm">
                <span className="text-zinc-500">
                    Don't have an account?
                </span>
                <Link to={"/signup"} className="text-orange-600 font-semibold ml-2 hover:underline">
                    Sign up
                </Link >
            </div>

        </div>

    )
}

export default LoginPage