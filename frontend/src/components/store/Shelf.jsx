import { useState } from 'react'
import Label3D from '../three/Label3D.jsx'
import { SHELF_DEPTH, SHELF_LEVELS, SHELF_WIDTH } from './shelfConfig.js'

const WOOD = '#d6b48a'
const FRAME = '#e2e8f0'


export default function Shelf({ label, accent = '#38bdf8', count, children, ...props }) {
  const [hovered, setHovered] = useState(false)
  const height = 2.4

  return (
    <group
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Laterales */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(side * SHELF_WIDTH) / 2, height / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.06, height, SHELF_DEPTH]} />
          <meshStandardMaterial color={FRAME} />
        </mesh>
      ))}
      {/* Fondo */}
      <mesh position={[0, height / 2, -SHELF_DEPTH / 2 + 0.01]} receiveShadow>
        <boxGeometry args={[SHELF_WIDTH, height, 0.02]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Repisas */}
      {[0.05, ...SHELF_LEVELS].map((y) => (
        <group key={y}>
          <mesh position={[0, y - 0.02, 0]} castShadow receiveShadow>
            <boxGeometry args={[SHELF_WIDTH, 0.04, SHELF_DEPTH]} />
            <meshStandardMaterial color={WOOD} />
          </mesh>
          <mesh position={[0, y - 0.02, SHELF_DEPTH / 2]}>
            <boxGeometry args={[SHELF_WIDTH, 0.045, 0.01]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={hovered ? 1.4 : 0.5} />
          </mesh>
        </group>
      ))}
      {/* Cartel */}
      <mesh position={[0, height + 0.25, 0]}>
        <boxGeometry args={[SHELF_WIDTH * 0.8, 0.55, 0.05]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={hovered ? 0.9 : 0.35} />
      </mesh>
      <Label3D
        position={[0, height + 0.25, 0.03]}
        width={SHELF_WIDTH * 0.8}
        height={0.55}
        title={label}
        subtitle={typeof count === 'number' ? `${count} unidades en inventario` : undefined}
      />
      {children}
    </group>
  )
}
