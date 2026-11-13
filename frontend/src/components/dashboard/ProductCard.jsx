const currency = new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' })

function stockBadge(stock) {
  if (stock === 0) return { text: 'Agotado', cls: 'bg-rose-500/15 text-rose-300' }
  if (stock <= 5) return { text: 'Stock bajo', cls: 'bg-amber-500/15 text-amber-300' }
  return { text: 'Disponible', cls: 'bg-emerald-500/15 text-emerald-300' }
}

export default function ProductCard({ product, pending, onSell }) {
  const badge = stockBadge(product.stock)

  return (
    <li className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">#{product.id}</span>
          <h3 className="truncate font-semibold text-white">{product.name}</h3>
        </div>
        <p className="text-sm text-slate-400">{currency.format(product.price)}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-2xl font-bold tabular-nums text-white">{product.stock}</div>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge.cls}`}>{badge.text}</span>
        </div>
        <button
          type="button"
          onClick={() => onSell(product)}
          disabled={product.stock <= 0 || pending}
          className="whitespace-nowrap rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-400 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:opacity-70"
        >
          {pending ? 'Vendiendo…' : 'Vender 1 Unidad'}
        </button>
      </div>
    </li>
  )
}
