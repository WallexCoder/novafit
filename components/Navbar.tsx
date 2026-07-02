"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    const handleStorage = () => {
      const u = localStorage.getItem("user");
      setUser(u ? JSON.parse(u) : null);
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(count);
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/products?sort=new", label: "New Arrivals" },
    { href: "/products?category=accessories", label: "Accessories" },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <nav className="px-6 md:px-12 py-4 bg-cream font-serif relative">
      <div className="flex items-center justify-between md:mx-32">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide text-espresso">
          NOVAFIT
        </h1>

        <div className="hidden md:flex gap-8 text-xl font-bold text-espresso">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex gap-5 items-center text-espresso">
          <Search size={30} className="cursor-pointer" />

          {user ? (
            <>
              <span className="text-sm font-medium">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-[#6E473B] text-white px-6 py-3 rounded-md font-bold transition-colors duration-500 ease-in-out hover:bg-[#A78D78]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              
              <a  href="/login"
                className="text-sm bg-[#6E473B] text-white px-6 py-3 rounded-md font-bold transition-colors duration-500 ease-in-out hover:bg-[#A78D78]"
              >
                Login
              </a>
              
              <a  href="/register"
                className="text-sm bg-[#6E473B] text-white px-6 py-3 rounded-md font-bold transition-colors duration-500 ease-in-out hover:bg-[#A78D78]"
              >
                Register
              </a>
            </>
          )}

          <a href="/cart" className="relative">
            <ShoppingCart size={30} className="cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-cocoa text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </a>
        </div>

        <div className="flex md:hidden items-center gap-4 text-espresso">
          <a href="/cart" className="relative">
            <ShoppingCart size={26} className="cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-cocoa text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] mt-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 text-lg font-bold text-espresso pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className="flex items-center gap-3 pt-2">
            <Search size={24} className="cursor-pointer" />
            <span className="text-sm">Search</span>
          </div>

          <div className="flex gap-3 pt-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex-1 text-center text-sm bg-[#6E473B] text-white px-6 py-3 rounded-md font-bold transition-colors duration-500 ease-in-out hover:bg-[#A78D78]"
              >
                Logout
              </button>
            ) : (
              <>
                
                <a  href="/login"
                  className="flex-1 text-center text-sm bg-[#6E473B] text-white px-6 py-3 rounded-md font-bold transition-colors duration-500 ease-in-out hover:bg-[#A78D78]"
                >
                  Login
                </a>
                
                <a  href="/register"
                  className="flex-1 text-center text-sm bg-[#6E473B] text-white px-6 py-3 rounded-md font-bold transition-colors duration-500 ease-in-out hover:bg-[#A78D78]"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
