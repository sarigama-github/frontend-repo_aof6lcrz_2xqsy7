export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-600 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p className="font-semibold text-gray-900">Flux Apparel</p>
          <p className="mt-2">Premium basics engineered for motion. Built with comfort-first materials and minimalist design.</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Shop</p>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:underline">New Arrivals</a></li>
            <li><a href="#" className="hover:underline">Best Sellers</a></li>
            <li><a href="#" className="hover:underline">Gift Cards</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Support</p>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Returns</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Legal</p>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} Flux Apparel. All rights reserved.</div>
    </footer>
  )
}
