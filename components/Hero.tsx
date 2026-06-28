export default function Hero() {
  return (
    <section
      className="relative h-[600px] flex items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      {/* dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-espresso/40" />

      <div className="relative z-10 px-8 md:px-16 max-w-lg">
        <p className="text-cream text-sm uppercase tracking-widest mb-3">
          Fall Essentials
        </p>
        <h2 className="text-cream text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Update Your Wardrobe.
          <br />
          Shop the New Collection
        </h2>

        <div className="flex gap-4">
          
            <a href="/products?category=men" className="bg-camel text-espresso px-6 py-3 rounded-md font-medium hover:bg-cocoa hover:text-cream transition">
            Shop Men
          </a>
          
           <a href="/products?category=women" className="bg-camel text-espresso px-6 py-3 rounded-md font-medium hover:bg-cocoa hover:text-cream transition">
            Shop Women
          </a>
        </div>
      </div>
    </section>
  );
}