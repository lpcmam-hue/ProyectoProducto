import { useEffect, useMemo } from 'react'
import { CanvasTexture, SRGBColorSpace } from 'three'

/** Cartel de texto renderizado en un canvas (sin dependencias de red ni del DOM). */
export default function Label3D({ title, subtitle, width = 2.4, height = 0.4, color = '#ffffff', ...props }) {
  const texture = useMemo(() => {
    const scale = 256
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const cx = canvas.width / 2
    const titleSize = canvas.height * (subtitle ? 0.45 : 0.6)
    ctx.font = `800 ${titleSize}px Inter, system-ui, sans-serif`
    ctx.fillText(title.toUpperCase(), cx, canvas.height * (subtitle ? 0.4 : 0.5))
    if (subtitle) {
      ctx.globalAlpha = 0.9
      ctx.font = `600 ${canvas.height * 0.26}px Inter, system-ui, sans-serif`
      ctx.fillText(subtitle, cx, canvas.height * 0.8)
    }
    const tex = new CanvasTexture(canvas)
    tex.colorSpace = SRGBColorSpace
    tex.anisotropy = 4
    return tex
  }, [title, subtitle, width, height, color])

  useEffect(() => () => texture.dispose(), [texture])

  return (
    <mesh {...props}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  )
}
