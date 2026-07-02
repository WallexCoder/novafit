"use client";

import { useState } from "react";
const router = useRouter();
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import StarRating from "@/components/StarRating";
import Footer from "@/components/Footer";
import api from "@/lib/api";

const allProducts = [
  {
    id: 1,
    name: "Plaid Vintage",
    description: "Plaid vintage short sleeve shirt with frontal pocket",
    price: 23800,
    category: "T-Shirts",
    rating: 4.5,
    reviews: 1619,
    image: "https://i.pinimg.com/736x/b9/89/0a/b9890a356c9cd33a0dca2048c47e1b31.jpg",
  },
  {
    id: 2,
    name: "Denim Vintage Shirt",
    description: "Denim vintage long sleeve shirt",
    price: 34900,
    category: "Shirts",
    rating: 4,
    reviews: 843,
    image: "https://i.pinimg.com/736x/65/3a/e1/653ae1fab9aa3f38cfbca680ac701788.jpg",
  },
  {
    id: 3,
    name: "Croc Vintage Shirt",
    description: "Multi-coloured vintage shirt with crocodile skin design",
    price: 33000,
    category: "Shirts",
    rating: 4.5,
    reviews: 512,
    image: "https://i.pinimg.com/736x/3e/59/dc/3e59dc1df59067513237369548119c46.jpg",
  },
  {
    id: 4,
    name: "Stocky Vintage Shirt",
    description: "Stock multi-coloured patch vintage shirt for men and women",
    price: 35500,
    category: "Shirts",
    rating: 3.5,
    reviews: 298,
    image: "https://i.pinimg.com/736x/54/4f/57/544f5722335445d68f54d76f5b73de0e.jpg",
  },
  {
    id: 5,
    name: "Cargo Street Shirt",
    description: "Bold cargo style street shirt for everyday wear",
    price: 28000,
    category: "Shirts",
    rating: 4,
    reviews: 401,
    image: "https://i.pinimg.com/736x/83/9f/61/839f61f294ab63658eb735c6614609c9.jpg",
  },
  {
    id: 6,
    name: "Urban Classic Tee",
    description: "Clean urban style classic tee for all occasions",
    price: 18000,
    category: "T-Shirts",
    rating: 5,
    reviews: 776,
    image: "https://i.pinimg.com/736x/88/22/6a/88226a36ab59af3e5bb48fae52eb7593.jpg",
  },
  {
    id: 7,
    name: "Retro Print Shirt",
    description: "Retro inspired print shirt with bold patterns",
    price: 31000,
    category: "Shirts",
    rating: 4.5,
    reviews: 334,
    image: "https://i.pinimg.com/736x/f1/5b/be/f15bbe9085e970a8971330d9a2b9e47d.jpg",
  },
  {
    id: 8,
    name: "Nova Essentials Tee",
    description: "Everyday essential tee, soft and comfortable",
    price: 15000,
    category: "T-Shirts",
    rating: 3.5,
    reviews: 189,
    image: "https://i.pinimg.com/736x/7a/00/e6/7a00e6c6dc9332baf752e2cdf5f4ae1c.jpg",
  },
];

const categories = ["All", "T-Shirts", "Shirts", "Hoodies", "Caps"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [addedId, setAddedId] = useState<number | null>(null);

  const filtered = allProducts
    .filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  async function handleAddToCart(e: React.MouseEvent, product: typeof allProducts[0]) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await api.post("/cart", {
        productId: product.id,
        quantity: 1,
        size: "M",
      });
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 2000);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  }

  return (
    <div>
      <Navbar />

      <main className="py-12 px-6 md:px-12 bg-cream min-h-screen">
        <div className="md:mx-32">
          <div className="mb-8">
            <p className="text-camel text-sm font-semibold uppercase tracking-widest mb-1">
              Browse
            </p>
            <h1 className="text-3xl font-serif font-bold text-espresso">
              All Products
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-sand rounded-md px-4 py-2 outline-none focus:border-camel bg-white text-sm w-full md:w-64"
            />

            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat
                      ? "bg-espresso text-cream"
                      : "bg-white border border-sand text-espresso hover:border-camel"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-sand rounded-md px-4 py-2 outline-none focus:border-camel bg-white text-sm md:ml-auto"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <p className="text-sm text-cocoa/60 mb-6">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-cocoa/60 text-lg">No products found.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-sm text-camel underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filtered.map((product) => (
                
                 <a key={product.id}
                  href={`/products/${product.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-xs text-camel uppercase tracking-wide mb-1">
                      NovaFit
                    </p>
                    <h4 className="font-semibold text-espresso mb-1">
                      {product.name}
                    </h4>
                    <p className="text-sm text-cocoa/70 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <StarRating rating={product.rating} reviews={product.reviews} />
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-espresso">
                        ₦{product.price.toLocaleString()}.99
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`text-xs font-medium px-3 py-2 rounded-md transition ${
                          addedId === product.id
                            ? "bg-green-600 text-white"
                            : "bg-cocoa text-cream hover:bg-espresso"
                        }`}
                      >
                        {addedId === product.id ? "✓ Added!" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}