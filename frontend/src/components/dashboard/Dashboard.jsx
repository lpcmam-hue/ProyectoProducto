import { useState } from 'react'
import useProducts from '../../hooks/useProducts.js'
import ProductForm from './ProductForm.jsx'
import ProductList from './ProductList.jsx'
import StatsCards from './StatsCards.jsx'

export default function Dashboard() {
  const { products, loading, error, lastUpdated, pendingIds, refresh, addProduct, sellOne } = useProducts()
  const [sellError, setSellError] = useState(null)

  const handleSell = async (product) => {
    setSellError(null)
    try {
      await sellOne(product)
    } catch (err) {
      setSellError(err.message)
    }
  }

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Panel de ventas e inventario</h1>
            <p className="text-sm text-slate-400">
              {lastUpdated
                ? `Actualizado a las ${lastUpdated.toLocaleTimeString('es-BO')} · se refresca cada 10 s`
                : 'Conectando con el servidor…'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => refresh()}
            disabled={loading}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 disabled:opacity-50"
          >
            {loading ? 'Cargando…' : 'Actualizar'}
          </button>
        </div>

        <StatsCards products={products} />

        {error && <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
        {sellError && (
          <div className="flex items-start justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            <span>{sellError}</span>
            <button type="button" onClick={() => setSellError(null)} className="font-bold" aria-label="Cerrar">
              ×
            </button>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <ProductForm onCreate={addProduct} />
          </div>
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-white">Productos ({products.length})</h2>
            <ProductList products={products} loading={loading} pendingIds={pendingIds} onSell={handleSell} />
          </section>
        </div>
      </div>
    </div>
  )
}
