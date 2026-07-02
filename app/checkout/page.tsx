"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
async function handlePlaceOrder(e: React.FormEvent) {
  e.preventDefault();

  const { fullName, email, phone, address, city, state } = form;
  if (!fullName || !email || !phone || !address || !city || !state) {
    alert("Please fill in all fields");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return;
  }

  try {
    await api.post("/orders");
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));
    setOrdered(true);
  } catch (err: any) {
    alert(err.response?.data?.message || "Failed to place order");
  }
}

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (ordered) {
    return (
      <div>
        <Navbar />
        <main className="min-h-screen bg-cream flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-serif font-bold text-espresso mb-3">
              Order Placed!
            </h2>
            <p className="text-cocoa/70 mb-8">
              Thank you {form.fullName}! Your order has been received and is
              being processed. We'll send a confirmation to {form.email}.
            </p>
            
             <a href="/products"
              className="bg-cocoa text-cream px-8 py-3 rounded-md font-semibold hover:bg-espresso transition"
            >
              Continue Shopping
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="py-12 px-6 md:px-12 bg-cream min-h-screen">
        <div className="md:mx-32">
          <p className="text-camel text-sm font-semibold uppercase tracking-widest mb-1">
            Almost there
          </p>
          <h1 className="text-3xl font-serif font-bold text-espresso mb-8"> 
            Checkout
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-cocoa/60 text-lg mb-4">
                Your cart is empty
              </p>
              
               <a href="/products"
                className="bg-cocoa text-cream px-6 py-3 rounded-md font-medium hover:bg-espresso transition"
              >
                Shop Now
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left - Delivery Form */}
              <form
                onSubmit={handlePlaceOrder}
                className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-serif font-bold text-espresso text-xl mb-6">
                  Delivery Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-espresso mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full border border-sand rounded-md px-4 py-3 outline-none focus:border-camel bg-cream text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-espresso mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full border border-sand rounded-md px-4 py-3 outline-none focus:border-camel bg-cream text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-espresso mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="08012345678"
                      className="w-full border border-sand rounded-md px-4 py-3 outline-none focus:border-camel bg-cream text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-espresso mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Lagos"
                      className="w-full border border-sand rounded-md px-4 py-3 outline-none focus:border-camel bg-cream text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-espresso mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="Lagos State"
                      className="w-full border border-sand rounded-md px-4 py-3 outline-none focus:border-camel bg-cream text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-espresso mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="12 Broad Street, Victoria Island"
                      className="w-full border border-sand rounded-md px-4 py-3 outline-none focus:border-camel bg-cream text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full bg-cocoa text-cream font-semibold py-4 rounded-md hover:bg-espresso transition"
                >
                  Place Order — ₦{total.toLocaleString()}.99
                </button>
              </form>

              {/* Right - Order Summary */}
              <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
                <h3 className="font-serif font-bold text-espresso text-xl mb-6">
                  Order Summary
                </h3>

                <div className="flex flex-col gap-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-3 items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-espresso">
                          {item.name}
                        </p>
                        <p className="text-xs text-cocoa/60">
                          Size: {item.size} · Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-espresso">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-sand pt-4 space-y-2 text-sm text-cocoa/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{total.toLocaleString()}.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-espresso pt-2 border-t border-sand">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}.99</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}