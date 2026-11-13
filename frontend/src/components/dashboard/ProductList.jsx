import ProductCard from './ProductCard.jsx'

export default function ProductList({ products, loading, pendingIds, onSell }) {
  if (loading && products.length === 0) {
    return (
      <ul className="space-y-3">
        {Array.from({ length: 4 }, (_, i) => (
          <li key={i} className="h-20 animate-pulse rounded-xl bg-slate-800/60" />
        ))}
      </ul>
    )
  }

  if (products.length === 0) {
    return <p className="py-10 text-center text-slate-400">No hay productos registrados todavía.</p>
  }

  return (
    <ul className="space-y-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} pending={pendingIds.has(product.id)} onSell={onSell} />
      ))}
    </ul>
  )
}
