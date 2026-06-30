const products = [
  {
    id: 1,
    name: "Plaid Vintage",
    description: "Plaid vintage short sleeve shirt with frontal pocket",
    stars: "⭐⭐⭐⭐⭐",                                                
    price: 23800,
    image:
      "https://i.pinimg.com/736x/b9/89/0a/b9890a356c9cd33a0dca2048c47e1b31.jpg",
  },
  {
    id: 2,
    name: "Denim Vintage Shirt",
    description: "Denim vintage long sleeve shirt",
    stars: "⭐⭐⭐⭐⭐",
    price: 34900,
    image:
      "https://i.pinimg.com/736x/65/3a/e1/653ae1fab9aa3f38cfbca680ac701788.jpg",
  },
  {
    id: 3,
    name: "Croc Vintage Shirt",
    description: "Multi-coloured vintage shirt with crocodile skin design",
    stars: "⭐⭐⭐⭐⭐",
    price: 33000,
    image:
      "https://i.pinimg.com/736x/3e/59/dc/3e59dc1df59067513237369548119c46.jpg",
  },
  {
    id: 4,
    name: "Stocky Vintage Shirt",
    description: "Stock multi-coloured patch vintage shirt for men and women",
    stars: "⭐⭐⭐⭐⭐",
    price: 35500,
    image:
      "https://i.pinimg.com/736x/54/4f/57/544f5722335445d68f54d76f5b73de0e.jpg",
  },
  {
    id: 4,
    name: "Stocky Vintage Shirt",
    description: "Stock multi-coloured patch vintage shirt for men and women",
    stars: "⭐⭐⭐⭐⭐",
    price: 35500,
    image:
      "https://i.pinimg.com/736x/83/9f/61/839f61f294ab63658eb735c6614609c9.jpg",
  },
  {
    id: 4,
    name: "Stocky Vintage Shirt",
    description: "Stock multi-coloured patch vintage shirt for men and women",
    stars: "⭐⭐⭐⭐⭐",
    price: 35500,
    image:
      "https://i.pinimg.com/736x/88/22/6a/88226a36ab59af3e5bb48fae52eb7593.jpg",
  },
  {
    id: 4,
    name: "Stocky Vintage Shirt",
    description: "Stock multi-coloured patch vintage shirt for men and women",
    stars: "⭐⭐⭐⭐⭐",
    price: 35500,
    image:
      "https://i.pinimg.com/736x/f1/5b/be/f15bbe9085e970a8971330d9a2b9e47d.jpg",
  },
  {
    id: 4,
    name: "Stocky Vintage Shirt",
    description: "Stock multi-coloured patch vintage shirt for men and women",
    stars: "⭐⭐⭐⭐⭐",
    price: 35500,
    image:
      "https://i.pinimg.com/736x/7a/00/e6/7a00e6c6dc9332baf752e2cdf5f4ae1c.jpg",
  },
];

export default function NewArrivals() {
  return (
    <section className="py-20 px-6 md:px-12 bg-cream">
      <div className="md:mx-32 flex items-end justify-between mb-10">
        <div>
          <p className="text-camel text-sm font-semibold uppercase tracking-widest mb-1">
            New Arrivals
          </p>
          <h3 className="text-3xl font-serif font-bold text-espresso">
            Recently Sourced
          </h3>
        </div>
        
          <a href="/products"
          className="text-cocoa text-sm font-medium hover:text-espresso transition"
        >
          View All &rarr;
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:mx-32">
        {products.map((product) => (
          <div
            key={product.id}
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
              <p className="text-sm text-cocoa/70 mb-3 line-clamp-2">
                {product.description}
              </p>
              <p className="">
                {product.stars}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-espresso">
                  ₦{product.price.toLocaleString()}.99
                </span>
                <button className="bg-cocoa text-cream text-xs font-medium px-3 py-2 rounded-md hover:bg-espresso transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}