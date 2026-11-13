import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProducts } from '../../services/api.js'
import StoreScene from './StoreScene.jsx'

const CATEGORY_KEYWORDS = {
  computadoras: ['laptop', 'computadora', 'pc', 'notebook', 'portatil', 'portátil', 'desktop', 'monitor'],
  mouses: ['mouse', 'raton', 'ratón'],
  celulares: ['celular', 'phone', 'iphone', 'smartphone', 'galaxy', 'movil', 'móvil', 'xiaomi'],
  tablets: ['tablet', 'ipad', 'tab'],
}

function countByCategory(products) {
  const counts = { computadoras: 0, mouses: 0, celulares: 0, tablets: 0 }
  for (const p of products) {
    const name = p.name.toLowerCase()
    for (const [cat, words] of Object.entries(CATEGORY_KEYWORDS)) {
      if (words.some((w) => name.includes(w))) {
        counts[cat] += p.stock
        break
      }
    }
  }
  return counts
}

export default function StoreView() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    let active = true
    getProducts()
      .then((data) => active && setCounts(countByCategory(data)))
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="absolute inset-0">
      <StoreScene counts={counts} />

      <div className="pointer-events-none absolute left-4 top-4 max-w-sm rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur sm:left-6 sm:top-6">
        <h1 className="text-xl font-bold text-white sm:text-2xl">Bienvenido a TechStore 3D</h1>
        <p className="mt-1 text-sm text-slate-300">
          Arrastra para recorrer la tienda y usa la rueda del mouse para acercarte a los estantes.
        </p>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3">
        <Link
          to="/computadora"
          className="rounded-full border border-white/20 bg-slate-900/80 px-5 py-2.5 text-sm font-semibold text-slate-100 shadow-lg backdrop-blur transition hover:bg-slate-800"
        >
          Ver computadora 3D
        </Link>
        <Link
          to="/panel"
          className="flex items-center gap-2 rounded-full bg-sky-500 px-6 py-4 text-base font-bold text-white shadow-xl shadow-sky-500/30 transition hover:scale-105 hover:bg-sky-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 15l4-4 3 3 5-6" />
          </svg>
          Ingresar al panel de ventas
        </Link>
      </div>
    </div>
  )
}
