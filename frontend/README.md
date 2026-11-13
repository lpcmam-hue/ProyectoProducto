# TechStore 3D — Frontend

Frontend de gestión de inventario y ventas de dispositivos electrónicos construido con **React + Vite + Tailwind CSS** y **Three.js** (`@react-three/fiber` y `@react-three/drei`).

## Requisitos

- Node.js 20 o superior

## Puesta en marcha

```bash
cd frontend
cp .env.example .env   # ajusta VITE_API_URL si es necesario
npm install
npm run dev            # http://localhost:5173
```

Otros scripts: `npm run build` (compilación de producción en `dist/`), `npm run preview` y `npm run lint`.

## Variables de entorno

| Variable       | Descripción                                    |
| -------------- | ---------------------------------------------- |
| `VITE_API_URL` | URL completa del recurso de productos de la API |

Si no se define, se usa `https://proyectoproducto-1.onrender.com/api/v1/products`.

## Vistas

| Ruta           | Descripción                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------- |
| `/`            | Tienda 3D interactiva con estantes de computadoras, mouses, celulares y tablets.              |
| `/panel`       | Panel de ventas: lista en tiempo real (refresco cada 10 s), alta de productos y "Vender 1 Unidad". |
| `/computadora` | Visor 3D de una computadora con rotación y zoom (OrbitControls).                              |

## API consumida (`src/services/api.js`)

| Acción             | Método y ruta                                                     |
| ------------------ | ----------------------------------------------------------------- |
| Listar productos   | `GET {VITE_API_URL}`                                              |
| Crear producto     | `POST {VITE_API_URL}` con `{ name, price, stock }`                |
| Actualizar stock   | `PATCH {VITE_API_URL}/{id}` con `{ stock }` (si no existe, reintenta con `PUT {VITE_API_URL}/{id}` enviando el producto completo) |

La venta descuenta el stock de forma optimista en la interfaz; si el backend rechaza la petición, el valor se revierte y se muestra el error.

## Estructura

```
src/
├── App.jsx                     # Rutas
├── services/api.js             # Cliente HTTP (Axios)
├── hooks/useProducts.js        # Estado del inventario, polling y ventas
└── components/
    ├── layout/                 # Navbar, Loader
    ├── store/                  # Tienda 3D (escena, estantes)
    ├── dashboard/              # Panel de ventas (formulario, lista, tarjetas, estadísticas)
    ├── computer/               # Visor 3D de la computadora
    └── three/                  # Modelos 3D reutilizables (dispositivos, computadora, carteles)
```

## Despliegue

Al usar `BrowserRouter`, configura en tu hosting estático una regla de reescritura de `/*` hacia `/index.html` (por ejemplo, en Render Static Site: *Redirects/Rewrites → Rewrite `/*` → `/index.html`*).
