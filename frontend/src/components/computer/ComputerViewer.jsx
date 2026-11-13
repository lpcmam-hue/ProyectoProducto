import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { PCFShadowMap } from 'three'
import { Suspense, useState } from 'react'
import ComputerModel from '../three/ComputerModel.jsx'

export default function ComputerViewer() {
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="absolute inset-0">
      <Canvas shadows={{ type: PCFShadowMap }} camera={{ position: [3, 2.2, 4], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 4]} intensity={1.6} castShadow />
        <pointLight position={[-3, 2, 2]} intensity={15} color="#38bdf8" />
        <pointLight position={[3, 1, -2]} intensity={10} color="#a78bfa" />
        <Suspense fallback={null}>
          <ComputerModel position={[-0.4, 0, 0]} />
          <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={8} blur={2.5} far={3} />
        </Suspense>
        <OrbitControls
          makeDefault
          target={[0.3, 0.7, 0]}
          enableDamping
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
          minDistance={1.5}
          maxDistance={10}
        />
      </Canvas>

      <div className="absolute left-4 top-4 max-w-xs rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur sm:left-6 sm:top-6">
        <h1 className="text-lg font-bold text-white">Computadora interactiva</h1>
        <ul className="mt-2 space-y-1 text-sm text-slate-300">
          <li>Clic izquierdo + arrastrar: rotar</li>
          <li>Rueda del mouse: zoom</li>
          <li>Clic derecho + arrastrar: desplazar</li>
        </ul>
        <button
          type="button"
          onClick={() => setAutoRotate((v) => !v)}
          className="mt-3 rounded-lg bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          {autoRotate ? 'Detener rotación automática' : 'Activar rotación automática'}
        </button>
      </div>
    </div>
  )
}
