import { RoundedBox } from '@react-three/drei'

const DARK = '#1e293b'
const METAL = '#94a3b8'

export function Laptop({ screenColor = '#38bdf8', ...props }) {
  return (
    <group {...props}>
      <RoundedBox args={[0.6, 0.03, 0.4]} radius={0.01} position={[0, 0.015, 0]}>
        <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.032, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 0.22]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
      <group position={[0, 0.03, -0.19]} rotation={[-0.25, 0, 0]}>
        <RoundedBox args={[0.6, 0.38, 0.02]} radius={0.01} position={[0, 0.19, 0]}>
          <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 0.19, 0.011]}>
          <planeGeometry args={[0.54, 0.32]} />
          <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  )
}

export function DesktopPC({ screenColor = '#a78bfa', ...props }) {
  return (
    <group {...props}>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.22, 0.02, 0.15]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
      <mesh position={[0, 0.12, -0.02]}>
        <boxGeometry args={[0.04, 0.22, 0.03]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
      <RoundedBox args={[0.62, 0.38, 0.03]} radius={0.01} position={[0, 0.38, 0]}>
        <meshStandardMaterial color="#0f172a" />
      </RoundedBox>
      <mesh position={[0, 0.38, 0.016]}>
        <planeGeometry args={[0.58, 0.34]} />
        <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

export function Mouse({ color = '#f8fafc', ...props }) {
  return (
    <group {...props}>
      <mesh position={[0, 0.03, 0]} scale={[0.6, 0.35, 1]}>
        <sphereGeometry args={[0.09, 24, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.058, -0.035]}>
        <boxGeometry args={[0.004, 0.006, 0.05]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
      <mesh position={[0, 0.06, -0.03]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.012, 12]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

export function Phone({ color = '#0f172a', screenColor = '#34d399', ...props }) {
  return (
    <group {...props}>
      <RoundedBox args={[0.14, 0.28, 0.015]} radius={0.007} position={[0, 0.14, 0]}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.14, 0.0081]}>
        <planeGeometry args={[0.125, 0.255]} />
        <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export function Tablet({ color = '#334155', screenColor = '#f472b6', ...props }) {
  return (
    <group {...props}>
      <RoundedBox args={[0.32, 0.44, 0.015]} radius={0.01} position={[0, 0.22, 0]}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.22, 0.0081]}>
        <planeGeometry args={[0.29, 0.41]} />
        <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}
