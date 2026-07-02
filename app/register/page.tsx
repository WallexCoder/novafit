"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "@/lib/api";
import Toast from "@/components/Toast";

export default function RegisterPage() {
 const [form, setForm] = useState({ name: "", email: "", password: "" });
const [error, setError] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [toast, setToast] = useState("");  // add this line

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  if (!form.name || !form.email || !form.password) {
    setError("All fields are required");
    return;
  }

  try {
    const res = await api.post("/users/register", form);
localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));
window.dispatchEvent(new Event("storage")); // add this line
setToast("Account created successfully! Redirecting...");
setTimeout(() => {
  window.location.href = "/";
}, 1500);
  } catch (err: any) {
    setError(err.response?.data?.message || "Registration failed");
  }
}
  return (
    <div className="min-h-screen flex">
      {/* Left side - image */}
      <div
        className="hidden md:flex w-1/2 relative bg-cover bg-center flex-col justify-between p-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-espresso/60" />

        <a href="/"><h1 className="relative z-10 text-white text-5xl font-serif font-bold">
          NovaFit
        </h1></a>

        <div className="relative z-10">
          <p className="text-cream text-xl font-serif italic mb-2">
            &ldquo;Quality clothing, made for every occasion.&rdquo;
          </p>
          <p className="text-sand text-sm">— NovaFit Team</p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center bg-cream px-8 md:px-16">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <p className="text-camel text-xs font-semibold uppercase tracking-widest mb-2">
            Get Started
          </p>
          <h2 className="text-3xl font-serif font-bold text-espresso mb-2">
            Create Account
          </h2>
          <p className="text-cocoa/70 text-sm mb-8">
            Already have an account?{" "}
            <a href="/login" className="text-black font-semibold hover:underline ">
              Sign in
            </a>
          </p>

          {error && (
            <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <label className="block text-sm font-medium text-espresso mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-sand rounded-md px-4 py-3 mb-5 outline-none focus:border-camel bg-white"
            placeholder="John Doe"
          />

          <label className="block text-sm font-medium text-espresso mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-sand rounded-md px-4 py-3 mb-5 outline-none focus:border-camel bg-white"
            placeholder="you@example.com"
          />

          <label className="block text-sm font-medium text-espresso mb-1">
            Password
          </label>
          <div className="relative mb-8">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-sand rounded-md px-4 py-3 outline-none focus:border-camel bg-white pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cocoa/60"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-camel text-espresso font-semibold py-3 rounded-md hover:bg-cocoa hover:text-cream transition"
          >
            Create Account
          </button>

          <p className="text-xs text-center text-cocoa/60 mt-6">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-camel font-medium">Terms</a> and{" "}
            <a href="/privacy" className="text-camel font-medium">Privacy Policy</a>.
          </p>
        </form>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}