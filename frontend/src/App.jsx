import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Loader from './components/layout/Loader.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'

const StoreView = lazy(() => import('./components/store/StoreView.jsx'))
const ComputerViewer = lazy(() => import('./components/computer/ComputerViewer.jsx'))

export default function App() {
  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="relative flex-1 overflow-hidden">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<StoreView />} />
            <Route path="/panel" element={<Dashboard />} />
            <Route path="/computadora" element={<ComputerViewer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
