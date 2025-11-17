import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import ProductCard from './ProductCard'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Featured3D({ onAdd }) {
  const [products, setProducts] = useState([])
  const [scene, setScene] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/featured`)
        const data = await res.json()
        setProducts(data)
        const withScene = data.find(p => p.spline_scene)
        setScene(withScene?.spline_scene || null)
      } catch (e) {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="featured" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden border bg-white/60 backdrop-blur relative aspect-square">
            {scene ? (
              <Spline scene={scene} />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-indigo-50 via-pink-50 to-amber-50" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured drops</h2>
            <p className="mt-2 text-gray-600">Our top picks this week, paired with an interactive 3D preview.</p>
            {loading ? (
              <p className="mt-6 text-gray-500">Loading...</p>
            ) : (
              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                {products.map(p => (
                  <ProductCard key={p.title} product={p} onAdd={onAdd} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
