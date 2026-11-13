import { useState } from 'react'
import { getErrorMessage } from '../../services/api.js'

const EMPTY = { name: '', price: '', stock: '' }

export default function ProductForm({ onCreate }) {
  const [values, setValues] = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!values.name.trim()) return 'El nombre es obligatorio.'
    const price = Number(values.price)
    if (values.price === '' || Number.isNaN(price) || price < 0) return 'Ingresa un precio válido (≥ 0).'
    const stock = Number(values.stock)
    if (values.stock === '' || !Number.isInteger(stock) || stock < 0) return 'El stock debe ser un número entero ≥ 0.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(null)
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const created = await onCreate(values)
      setSuccess(`Producto "${created.name}" registrado correctamente.`)
      setValues(EMPTY)
    } catch (err) {
      setError(`No se pudo registrar el producto: ${getErrorMessage(err)}`)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30'

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-lg" noValidate>
      <h2 className="text-lg font-semibold text-white">Registrar nuevo producto</h2>
      <p className="mt-1 text-sm text-slate-400">Se guardará directamente en la tabla de productos.</p>

      <div className="mt-4 space-y-4">
        <label className="block text-sm font-medium text-slate-300">
          Nombre
          <input name="name" value={values.name} onChange={handleChange} placeholder="Ej. Laptop ASUS ROG" className={inputClass} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium text-slate-300">
            Precio (Bs)
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={values.price}
              onChange={handleChange}
              placeholder="0.00"
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium text-slate-300">
            Stock
            <input
              name="stock"
              type="number"
              min="0"
              step="1"
              value={values.stock}
              onChange={handleChange}
              placeholder="0"
              className={inputClass}
            />
          </label>
        </div>
      </div>

      {error && <p className="mt-4 rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p>}
      {success && <p className="mt-4 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{success}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full rounded-lg bg-sky-500 px-4 py-2.5 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Guardando…' : 'Registrar producto'}
      </button>
    </form>
  )
}
