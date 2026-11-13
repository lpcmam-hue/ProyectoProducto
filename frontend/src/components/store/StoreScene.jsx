import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { PCFShadowMap } from 'three'
import { Suspense } from 'react'
import ComputerModel from '../three/ComputerModel.jsx'
import { DesktopPC, Laptop, Mouse, Phone, Tablet } from '../three/Devices.jsx'
import Shelf from './Shelf.jsx'
import { SHELF_LEVELS } from './shelfConfig.js'

const SCREEN_COLORS = ['#38bdf8', '#a78bfa', '#34d399', '#f472b6', '#fbbf24']
const BODY_COLORS = ['#0f172a', '#e2e8f0', '#1d4ed8', '#be123c', '#334155']

function itemsPerLevel(n, width = 2.6) {
  const step = width / n
  return Array.from({ length: n }, (_, i) => -width / 2 + step / 2 + i * step)
}

function ComputerShelf(props) {
  return (
    <Shelf label="Computadoras" accent="#38bdf8" {...props}>
      {SHELF_LEVELS.map((y, row) =>
        itemsPerLevel(3).map((x, i) =>
          (row + i) % 2 === 0 ? (
            <Laptop key={`${row}-${i}`} position={[x, y, 0.02]} screenColor={SCREEN_COLORS[(row + i) % 5]} />
          ) : (
            <DesktopPC key={`${row}-${i}`} position={[x, y, -0.05]} scale={0.85} screenColor={SCREEN_COLORS[(row + i) % 5]} />
          ),
        ),
      )}
    </Shelf>
  )
}

function MouseShelf(props) {
  return (
    <Shelf label="Mouses" accent="#22d3ee" {...props}>
      {SHELF_LEVELS.map((y, row) =>
        itemsPerLevel(6).map((x, i) => (
          <Mouse key={`${row}-${i}`} position={[x, y, 0.05]} rotation={[0, 0.3, 0]} scale={1.6} color={BODY_COLORS[(row + i) % 5]} />
        )),
      )}
    </Shelf>
  )
}

function PhoneShelf(props) {
  return (
    <Shelf label="Celulares" accent="#34d399" {...props}>
      {SHELF_LEVELS.map((y, row) =>
        itemsPerLevel(7).map((x, i) => (
          <Phone
            key={`${row}-${i}`}
            position={[x, y, 0]}
            rotation={[-0.15, 0, 0]}
            color={BODY_COLORS[(row + i) % 5]}
            screenColor={SCREEN_COLORS[(row * 2 + i) % 5]}
          />
        )),
      )}
    </Shelf>
  )
}

function TabletShelf(props) {
  return (
    <Shelf label="Tablets" accent="#f472b6" {...props}>
      {SHELF_LEVELS.map((y, row) =>
        itemsPerLevel(5).map((x, i) => (
          <Tablet
            key={`${row}-${i}`}
            position={[x, y, -0.05]}
            rotation={[-0.15, 0, 0]}
            scale={0.95}
            color={BODY_COLORS[(row + i + 2) % 5]}
            screenColor={SCREEN_COLORS[(row + i * 2) % 5]}
          />
        )),
      )}
    </Shelf>
  )
}

function Room() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <gridHelper args={[18, 18, '#94a3b8', '#94a3b8']} position={[0, 0.002, 0]} />
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[18, 5]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-9, 2.5, 2]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color="#273449" />
      </mesh>
      <mesh position={[9, 2.5, 2]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color="#273449" />
      </mesh>
      {/* Franjas de luz en el techo */}
      {[-4, 0, 4].map((x) => (
        <mesh key={x} position={[x, 4.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 10]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  )
}

function Counter(props) {
  return (
    <group {...props}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1, 1.1]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>
      <mesh position={[0, 1.02, 0]} castShadow>
        <boxGeometry args={[3.4, 0.05, 1.3]} />
        <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0.551]}>
        <planeGeometry args={[3, 0.08]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
      </mesh>
      <ComputerModel position={[-0.4, 1.045, 0]} scale={0.45} />
    </group>
  )
}

export default function StoreScene({ counts = {} }) {
  return (
    <Canvas shadows={{ type: PCFShadowMap }} camera={{ position: [0, 3.2, 8.5], fov: 50 }} dpr={[1, 2]}>
      <color attach="background" args={['#0b1120']} />
      <fog attach="fog" args={['#0b1120', 14, 26]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 8, 6]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-4, 4, 0]} intensity={20} color="#93c5fd" />
      <pointLight position={[4, 4, 0]} intensity={20} color="#f9a8d4" />

      <Suspense fallback={null}>
        <Room />
        <ComputerShelf position={[-3.6, 0, -4.6]} count={counts.computadoras} />
        <PhoneShelf position={[0, 0, -4.6]} count={counts.celulares} />
        <TabletShelf position={[3.6, 0, -4.6]} count={counts.tablets} />
        <MouseShelf position={[-8.6, 0, -0.5]} rotation={[0, Math.PI / 2, 0]} count={counts.mouses} />
        <Counter position={[0, 0, 0.5]} />
        <ContactShadows position={[0, 0.01, 0]} opacity={0.4} scale={20} blur={2} far={5} />
      </Suspense>

      <OrbitControls
        target={[0, 1.3, -1.5]}
        enablePan={false}
        minDistance={3}
        maxDistance={11}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 2.5}
      />
    </Canvas>
  )
}
