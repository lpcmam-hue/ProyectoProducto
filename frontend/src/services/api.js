import axios from 'axios'

const DEFAULT_API_URL = 'https://proyectoproducto-1.onrender.com/api/v1/products'

export const API_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/+$/, '')

// Render (plan gratuito) puede tardar en "despertar", por eso el timeout es amplio.
const http = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
})

export function getErrorMessage(error) {
  if (error?.response) {
    const { status, data } = error.response
    if (Array.isArray(data?.detail)) {
      return data.detail.map((d) => d.msg).join(', ')
    }
    if (typeof data?.detail === 'string') return `${data.detail} (HTTP ${status})`
    return `El servidor respondió con HTTP ${status}`
  }
  if (error?.code === 'ECONNABORTED') return 'Tiempo de espera agotado: el servidor no respondió.'
  return error?.message || 'Error de red desconocido'
}

export async function getProducts() {
  const { data } = await http.get('')
  return data
}

export async function createProduct({ name, price, stock, image_url = null }) {
  const { data } = await http.post('', {
    name: name.trim(),
    price: Number(price),
    stock: Number.parseInt(stock, 10),
    image_url: image_url || null,
  })
  return data
}

/**
 * Actualiza el stock de un producto.
 * Intenta primero PATCH /{id} con { stock } y, si el backend no lo soporta
 * (404/405), reintenta con PUT /{id} enviando el producto completo.
 */
export async function updateProductStock(product, stock) {
  const url = `/${product.id}`
  try {
    const { data } = await http.patch(url, { stock })
    return data
  } catch (error) {
    const status = error?.response?.status
    if (status !== 404 && status !== 405) throw error
    const { id: _id, ...rest } = product
    try {
      const { data } = await http.put(url, { ...rest, stock })
      return data
    } catch (putError) {
      const putStatus = putError?.response?.status
      if (putStatus === 404 || putStatus === 405) {
        throw new Error(
          `El backend no tiene un endpoint PATCH/PUT ${API_URL}/{id} para actualizar el stock (HTTP ${putStatus}).`,
          { cause: putError },
        )
      }
      throw putError
    }
  }
}
