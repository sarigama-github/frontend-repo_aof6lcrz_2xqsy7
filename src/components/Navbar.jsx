import { ShoppingCart, Shirt, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onCartOpen }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="inline-flex items-center gap-2 font-semibold text-gray-900">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 grid place-items-center text-white">
            <Shirt size={18} />
          </div>
          <span>Flux Apparel</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#new" className="hover:text-gray-900">New Arrivals</a>
          <a href="#men" className="hover:text-gray-900">Men</a>
          <a href="#women" className="hover:text-gray-900">Women</a>
          <a href="#sale" className="hover:text-gray-900">Sale</a>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={onCartOpen} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors">
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
          </button>
          <button onClick={() => setOpen(v => !v)} className="md:hidden inline-flex items-center p-2 rounded-md hover:bg-gray-100">
            <Menu />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 grid gap-2 text-sm">
            <a href="#new" className="py-1">New Arrivals</a>
            <a href="#men" className="py-1">Men</a>
            <a href="#women" className="py-1">Women</a>
            <a href="#sale" className="py-1">Sale</a>
          </div>
        </div>
      )}
    </header>
  );
}
