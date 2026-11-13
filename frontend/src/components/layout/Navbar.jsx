import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Tienda 3D' },
  { to: '/panel', label: 'Panel de ventas' },
  { to: '/computadora', label: 'Computadora 3D' },
]

export default function Navbar() {
  return (
    <header className="z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-slate-900/90 px-4 py-3 backdrop-blur sm:px-6">
      <NavLink to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-white">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky-500 text-sm">TS</span>
        TechStore <span className="text-sky-400">3D</span>
      </NavLink>
      <nav className="flex gap-1">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                isActive ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
