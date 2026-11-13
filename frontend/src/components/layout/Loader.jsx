export default function Loader({ text = 'Cargando escena 3D…' }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center gap-3 text-slate-300">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
        <span className="text-sm">{text}</span>
      </div>
    </div>
  )
}
