import { Search, User, Heart, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="px-12 py-4 bg-cream font-serif">
        <div className="flex items-center justify-between mx-32">
        <h1 className="text-4xl font-extrabold tracking-wide text-espresso">
            NOVAFIT
        </h1>

        <div className="hidden md:flex gap-8 text-xl font-bold text-espresso">
            <a href="/" className="nav-link">Home</a>
            <a href="/products" className="nav-link">Shop</a>
            <a href="/products?sort=new" className="nav-link">New Arrivals</a>
            <a href="/products?category=men" className="nav-link">Men</a>
            <a href="/products?category=women" className="nav-link">Women</a>
            <a href="/products?category=accessories" className="nav-link">Accessories</a>
        </div>

        <div className="flex gap-5 items-center text-espresso">
            <Search size={30} className="cursor-pointer" />
            <a href="/login" className="text-sm  bg-[#6E473B] text-white px-6 py-3 rounded-md font-bold  transition-colors duration-500 ease-in-out hover:bg-[#A78D78] ">Login</a>
            <a href="/register" className="text-sm  bg-[#6E473B] text-white px-6 py-3 rounded-md font-bold transition-colors duration-500 ease-in-out hover:bg-[#A78D78]">Register</a>
            <a href="/cart">
            <ShoppingCart size={30} className="cursor-pointer" />
            </a>
        </div>
      </div>
    </nav>
  );
}