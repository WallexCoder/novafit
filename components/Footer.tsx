export default function Footer() {
  return (
    <footer className="bg-espresso text-cream pt-16 pb-8 px-6 md:px-12 mt-10">
      <div className="md:mx-32 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-2xl font-serif font-bold mb-1">NovaFit</h4>
          <p className="text-camel text-xs uppercase tracking-widest mb-4">
            Est. 2026
          </p>
          <p className="text-sand text-sm leading-relaxed max-w-xs">
            Quality clothing crafted with modern design, made for every occasion.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h5 className="font-semibold mb-4">Shop</h5>
          <ul className="space-y-2 text-sand text-sm">
            <li><a href="/products" className="hover:text-cream transition">All Products</a></li>
            <li><a href="/products?category=t-shirts" className="hover:text-cream transition">T-Shirts</a></li>
            <li><a href="/products?category=hoodies" className="hover:text-cream transition">Hoodies</a></li>
            <li><a href="/products?category=accessories" className="hover:text-cream transition">Accessories</a></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h5 className="font-semibold mb-4">Account</h5>
          <ul className="space-y-2 text-sand text-sm">
            <li><a href="/login" className="hover:text-cream transition">Sign In</a></li>
            <li><a href="/register" className="hover:text-cream transition">Register</a></li>
            <li><a href="/orders" className="hover:text-cream transition">My Orders</a></li>
            <li><a href="/cart" className="hover:text-cream transition">Cart</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h5 className="font-semibold mb-4">Help</h5>
          <ul className="space-y-2 text-sand text-sm">
            <li><a href="/shipping" className="hover:text-cream transition">Shipping</a></li>
            <li><a href="/returns" className="hover:text-cream transition">Returns</a></li>
            <li><a href="/contact" className="hover:text-cream transition">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="md:mx-32 border-t border-cocoa pt-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-sand">
        <p>&copy; {new Date().getFullYear()} NovaFit. All rights reserved.</p>
        <p>Crafted for everyday comfort and bold style.</p>
      </div>
    </footer>
  );
}