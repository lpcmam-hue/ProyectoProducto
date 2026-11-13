import { useCallback, useEffect, useRef, useState } from 'react'
import { createProduct, getErrorMessage, getProducts, updateProductStock } from '../services/api.js'

const POLL_INTERVAL_MS = 10000

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [pendingIds, setPendingIds] = useState(() => new Set())
  const pendingRef = useRef(new Set())

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts()
      // No sobrescribir productos con una venta en curso (actualización optimista).
      setProducts((prev) =>
        [...data]
          .sort((a, b) => a.id - b.id)
          .map((p) => (pendingRef.current.has(p.id) ? prev.find((x) => x.id === p.id) ?? p : p)),
      )
      setError(null)
      setLastUpdated(new Date())
    } catch (err) {
      setError(`No se pudo cargar el inventario: ${getErrorMessage(err)}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(() => {
    setLoading(true)
    return fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    fetchProducts()
    const id = setInterval(fetchProducts, POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [fetchProducts])

  const setPending = (id, value) => {
    if (value) pendingRef.current.add(id)
    else pendingRef.current.delete(id)
    setPendingIds(new Set(pendingRef.current))
  }

  const addProduct = useCallback(async (values) => {
    const created = await createProduct(values)
    setProducts((prev) => [...prev, created].sort((a, b) => a.id - b.id))
    return created
  }, [])

  const sellOne = useCallback(async (product) => {
    if (product.stock <= 0 || pendingRef.current.has(product.id)) return
    const newStock = product.stock - 1

    setPending(product.id, true)
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, stock: newStock } : p)))

    try {
      const updated = await updateProductStock(product, newStock)
      if (updated && typeof updated.stock === 'number') {
        setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, ...updated } : p)))
      }
    } catch (err) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, stock: product.stock } : p)))
      throw new Error(`No se pudo registrar la venta de "${product.name}": ${getErrorMessage(err)}`, {
        cause: err,
      })
    } finally {
      setPending(product.id, false)
    }
  }, [])

  return { products, loading, error, lastUpdated, pendingIds, refresh, addProduct, sellOne }
}
