import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Keyboard(props) {
  const keys = []
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 14; col++) {
      keys.push(
        <mesh key={`${row}-${col}`} position={[-0.52 + col * 0.08, 0.03, -0.12 + row * 0.08]}>
          <boxGeometry args={[0.065, 0.02, 0.065]} />
          <meshStandardMaterial color="#334155" />
        </mesh>,
      )
    }
  }
  return (
    <group {...props}>
      <RoundedBox args={[1.2, 0.04, 0.4]} radius={0.015} position={[0, 0.02, 0]}>
        <meshStandardMaterial color="#0f172a" />
      </RoundedBox>
      {keys}
    </group>
  )
}

function Tower(props) {
  const fanRef = useRef()
  useFrame((_, delta) => {
    if (fanRef.current) fanRef.current.rotation.z += delta * 6
  })
  return (
    <group {...props}>
      <RoundedBox args={[0.5, 1.1, 1.0]} radius={0.03} position={[0, 0.55, 0]}>
        <meshStandardMaterial color="#111827" metalness={0.4} roughness={0.4} />
      </RoundedBox>
      <mesh position={[-0.251, 0.55, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.85, 0.9]} />
        <meshPhysicalMaterial color="#1e1b4b" transparent opacity={0.6} roughness={0.05} />
      </mesh>
      <group ref={fanRef} position={[0, 0.75, 0.502]}>
        <mesh>
          <torusGeometry args={[0.12, 0.012, 12, 48]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]} position={[0, 0, 0.005]}>
            <boxGeometry args={[0.2, 0.035, 0.005]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0.35, 0.502]}>
        <circleGeometry args={[0.025, 24]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 0.06, 0.502]}>
        <planeGeometry args={[0.45, 0.015]} />
        <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

export default function ComputerModel(props) {
  return (
    <group {...props}>
      {/* Monitor */}
      <group position={[0, 0, -0.2]}>
        <RoundedBox args={[0.6, 0.04, 0.35]} radius={0.015} position={[0, 0.02, 0]}>
          <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.35, -0.05]}>
          <boxGeometry args={[0.08, 0.65, 0.05]} />
          <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.4} />
        </mesh>
        <RoundedBox args={[1.9, 1.1, 0.06]} radius={0.02} position={[0, 0.95, 0]}>
          <meshStandardMaterial color="#0b1120" />
        </RoundedBox>
        <mesh position={[0, 0.97, 0.031]}>
          <planeGeometry args={[1.8, 1.0]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0369a1" emissiveIntensity={0.9} />
        </mesh>
        {/* "Ventanas" esquemáticas en pantalla */}
        <mesh position={[-0.45, 1.12, 0.033]}>
          <planeGeometry args={[0.7, 0.45]} />
          <meshStandardMaterial color="#e0f2fe" emissive="#e0f2fe" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0.4, 0.8, 0.033]}>
          <planeGeometry args={[0.8, 0.4]} />
          <meshStandardMaterial color="#1e293b" emissive="#1e293b" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, 0.5, 0.033]}>
          <planeGeometry args={[1.8, 0.07]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
      <Keyboard position={[0, 0, 0.45]} />
      <group position={[0.85, 0, 0.45]}>
        <mesh position={[0, 0.035, 0]} scale={[0.65, 0.4, 1]}>
          <sphereGeometry args={[0.11, 32, 16]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} />
        </mesh>
      </group>
      <Tower position={[1.6, 0, -0.1]} />
    </group>
  )
}
