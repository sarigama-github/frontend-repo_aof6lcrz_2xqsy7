import Spline from '@splinetool/react-spline'

export default function Hero3D({ sceneUrl }) {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        {sceneUrl ? (
          <Spline scene={sceneUrl} />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50" />
        )}
      </div>

      <div className="relative z-10 h-full grid place-items-center">
        <div className="text-center px-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 shadow-sm">3D Ready</span>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Elevate your everyday style
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Explore our immersive 3D experience and discover premium basics engineered for movement and comfort.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="#featured" className="px-5 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800">Shop Featured</a>
            <a href="#catalog" className="px-5 py-3 rounded-md bg-white/90 hover:bg-white shadow border">Browse all</a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    </section>
  )
}
