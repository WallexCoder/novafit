export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
    >
        {/* espresso */}
      <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-12 mx-auto text-center">
            <p className="text-white text-2xl font-extrabold font-serif uppercase tracking-widest mb-3">
              Fall Essentials
            </p>
            {/* <h2 className="text-cream text-xl md:text-5xl font-bold mb-6 text-center">
              Quality clothing crafted with modern design and made for every occasion.
            </h2> */}

            <div className="text-[50px] font-serif font-extrabold text-white">
                <p>Quality clothing crafted with <span className="text-[#A78D78]"> modern design<br></br> and made</span> for every occasion.</p>
            </div>

            <div className="flex gap-4 justify-center">
                <a href="/products?category=men"className="bg-[#6E473B] text-white px-6 py-3 rounded-md font-bold font-serif transition-colors duration-500 ease-in-out hover:bg-[#A78D78]">Shop Men</a>

                <a href="/products?category=women"className="bg-[#6E473B] text-white px-6 py-3 rounded-md font-bold font-serif transition-colors duration-500 ease-in-out hover:bg-[#A78D78]">Shop Women</a>
            </div>
      </div>
    </section>
  );
}