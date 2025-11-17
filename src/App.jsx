import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import Featured3D from './components/Featured3D'
import Footer from './components/Footer'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [cart, setCart] = useState([])
  const [sceneUrl, setSceneUrl] = useState(null)

  useEffect(() => {
    // Fetch a hero scene from featured products if available
    const loadScene = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/featured`)
        const data = await res.json()
        const withScene = data.find(p => p.spline_scene)
        setSceneUrl(withScene?.spline_scene || null)
      } catch (e) {
        // ignore
      }
    }
    loadScene()
  }, [])

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * (i.qty || 1), 0), [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.title === product.title)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + 1 }
        return copy
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeItem = (title) => setCart(prev => prev.filter(i => i.title !== title))

  const checkout = async () => {
    if (cart.length === 0) return
    const order = {
      items: cart.map(c => ({
        product_id: 'unknown',
        title: c.title,
        size: c.sizes?.[0] || null,
        color: c.colors?.[0] || null,
        qty: c.qty || 1,
        price: c.price,
      })),
      subtotal: total,
      shipping: 0,
      total: total,
      customer: { name: 'Guest', email: 'guest@example.com' },
      status: 'placed',
    }
    try {
      const res = await fetch(`${BACKEND}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })
      const data = await res.json()
      alert(`Order placed! ID: ${data.order_id}`)
      setCart([])
    } catch (e) {
      alert('Checkout failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <Navbar onCartOpen={() => document.getElementById('cart-panel')?.showModal()} />

      <main className="pt-16">
        <Hero3D sceneUrl={sceneUrl} />
        <Featured3D onAdd={addToCart} />

        <section id="catalog" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900">Why shop with us?</h2>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div className="p-6 rounded-xl border bg-white">Premium materials</div>
              <div className="p-6 rounded-xl border bg-white">Fast, carbon-neutral shipping</div>
              <div className="p-6 rounded-xl border bg-white">Free 30-day returns</div>
              <div className="p-6 rounded-xl border bg-white">24/7 support</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <dialog id="cart-panel" className="rounded-2xl w-full max-w-lg bg-white p-0 shadow-2xl">
        <form method="dialog" className="sticky top-0 border-b p-4 flex items-center justify-between">
          <h3 className="font-semibold">Your cart</h3>
          <button className="px-3 py-1 rounded-md bg-gray-100">Close</button>
        </form>
        <div className="p-4 max-h-[50vh] overflow-auto divide-y">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.title} className="py-3 flex items-center gap-3">
                <img src={item.images?.[0]} className="h-14 w-14 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * (item.qty || 1)).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.title)} className="text-xs text-red-600 mt-1">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="text-lg font-semibold">${total.toFixed(2)}</p>
          </div>
          <button onClick={checkout} className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50" disabled={cart.length === 0}>Checkout</button>
        </div>
      </dialog>
    </div>
  )
}
