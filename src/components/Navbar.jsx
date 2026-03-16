import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { auth } from "../firebase/firebase"
import { signOut } from "firebase/auth"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const user = useSelector(store => store.auth.user)
  const {items, loading} = useSelector(store => store.cart)

  const logout = () => {
    signOut(auth)
  }


  return (
    <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* /* Logo */}
        <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 bg-orange-500 text-white rounded-xl flex items-center justify-center text-lg font-bold">
            B
          </div>

          <span className="text-xl font-bold text-orange-600 tracking-tight">
            Bazaar
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-sm font-medium">

          {/* Home */}
          <Link to={"/"} className="flex items-center gap-2 text-zinc-700 hover:text-orange-600 transition">
            <i className="fa-solid fa-house text-base"></i>
            <span className="hidden md:inline">Home</span>
          </Link>

          {/* Sell */}
          <Link to={"/sell-products"} className="flex items-center gap-2 text-zinc-700 hover:text-orange-600 transition">
            <i className="fa-solid fa-store text-base"></i>
            <span className="hidden md:inline">Sell</span>
          </Link>

          {/* Cart */}
          <Link to={'/cart'} className="relative flex items-center gap-2 text-zinc-700 hover:text-orange-600 transition">
            <div className="relative">
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              {
                !loading &&
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
                {items.length}
              </span>
              }
              
            </div>

            <span className="hidden md:inline">Cart</span>
          </Link>

          {/* Orders */}
          <Link
            to={"/my-orders"}
            className="flex items-center gap-2 text-zinc-700 hover:text-orange-600 transition"
          >
            <i className="fa-solid fa-box text-base"></i>
            <span className="hidden md:inline">Orders</span>
          </Link>

          {/* User Dropdown */}
          <div className="relative">

            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-zinc-800 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                {user?.displayName?.[0]}
              </div>
            </div>

            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden">

                {/* User Name */}
                <div className="px-4 py-3 text-sm font-semibold text-zinc-700 border-b">
                  {user.displayName}
                </div>

                {/* Logout */}
                <button onClick={logout} className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-100 flex items-center gap-2">
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar