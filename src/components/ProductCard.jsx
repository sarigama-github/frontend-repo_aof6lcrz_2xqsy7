import { Star } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={product.images?.[0]} alt={product.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-gray-900">{product.title}</h3>
          <p className="text-gray-900 font-semibold">${product.price.toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className={i < Math.round(product.rating || 0) ? "fill-amber-400" : "opacity-30"} />
          ))}
          <span className="ml-2 text-xs text-gray-500">{product.rating?.toFixed?.(1) || "4.5"}</span>
        </div>
        <button onClick={() => onAdd(product)} className="mt-4 w-full px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800">Add to cart</button>
      </div>
    </div>
  );
}
