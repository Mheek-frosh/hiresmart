import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface ParticleCloudProps {
  className?: string
}

export default function ParticleCloud({ className = '' }: ParticleCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 60 : 120
    const connectionThreshold = isMobile ? 8 : 6

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 30

    // Scene
    const scene = new THREE.Scene()

    // Mouse tracking
    const mouse = new THREE.Vector2(-9999, -9999)
    const raycaster = new THREE.Raycaster()

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // Particle colors
    const colorBlue = new THREE.Color(0x2563eb)
    const colorViolet = new THREE.Color(0x7c3aed)
    const colorCyan = new THREE.Color(0x06b6d4)

    // Create particles
    const particlesGroup = new THREE.Group()
    const particleMeshes: THREE.Mesh[] = []
    const particleData: {
      basePos: THREE.Vector3
      velocity: THREE.Vector3
      phase: number
      baseScale: number
      currentScale: number
      currentOpacity: number
    }[] = []

    const particleGeo = new THREE.IcosahedronGeometry(0.3, 0)

    for (let i = 0; i < particleCount; i++) {
      const r = 8 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      // Color distribution: 80% blue, 15% violet, 5% cyan
      let particleColor: THREE.Color
      const rand = Math.random()
      if (rand < 0.8) particleColor = colorBlue.clone()
      else if (rand < 0.95) particleColor = colorViolet.clone()
      else particleColor = colorCyan.clone()

      const material = new THREE.MeshBasicMaterial({
        color: particleColor,
        transparent: true,
        opacity: 0.8,
      })

      const mesh = new THREE.Mesh(particleGeo, material)
      mesh.position.set(x, y, z)

      const baseScale = 0.5 + Math.random() * 0.8
      mesh.scale.setScalar(baseScale)

      particlesGroup.add(mesh)
      particleMeshes.push(mesh)
      particleData.push({
        basePos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        phase: Math.random() * Math.PI * 2,
        baseScale,
        currentScale: baseScale,
        currentOpacity: 0.8,
      })
    }

    scene.add(particlesGroup)

    // Connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })

    const maxConnections = particleCount * particleCount
    const linePositions = new Float32Array(maxConnections * 6)
    const lineColors = new Float32Array(maxConnections * 6)
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    )
    lineGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3)
    )

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lineSegments)

    // Animation
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Static render
      particlesGroup.rotation.y = 0.3
      renderer.render(scene, camera)
      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        renderer.dispose()
        particleGeo.dispose()
        lineMaterial.dispose()
        particleMeshes.forEach((m) => (m.material as THREE.MeshBasicMaterial).dispose())
        lineGeometry.dispose()
      }
    }

    // Entrance animation
    particlesGroup.scale.setScalar(0.7)
    const startTime = Date.now()
    const entranceDuration = 2000

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate)
      const time = Date.now() * 0.001

      // Entrance scale animation
      const elapsed = Date.now() - startTime
      if (elapsed < entranceDuration) {
        const t = elapsed / entranceDuration
        const eased = 1 - Math.pow(1 - t, 3) // ease out cubic
        particlesGroup.scale.setScalar(0.7 + 0.3 * eased)
      } else {
        particlesGroup.scale.setScalar(1)
      }

      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const mesh = particleMeshes[i]
        const data = particleData[i]
        const t = time + data.phase

        const driftX = Math.sin(t * 0.5) * 0.02
        const driftY = Math.cos(t * 0.7) * 0.02
        const driftZ = Math.sin(t * 0.3) * 0.02

        const newPos = data.basePos.clone()
        newPos.add(data.velocity).add(new THREE.Vector3(driftX, driftY, driftZ))
        mesh.position.copy(newPos)

        // Mouse interaction
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObject(mesh)

        let targetScale: number
        let targetOpacity: number

        if (intersects.length > 0) {
          targetScale = data.baseScale * 2.0
          targetOpacity = 1.0
        } else {
          targetScale = data.baseScale
          targetOpacity = 0.6
        }

        data.currentScale += (targetScale - data.currentScale) * 0.1
        data.currentOpacity += (targetOpacity - data.currentOpacity) * 0.1

        mesh.scale.setScalar(data.currentScale)
        ;(mesh.material as THREE.MeshBasicMaterial).opacity = data.currentOpacity
      }

      // Cloud rotation
      particlesGroup.rotation.y = time * 0.05
      particlesGroup.rotation.x = Math.sin(time * 0.02) * 0.1

      // Update connections
      let lineIdx = 0
      const tempColor1 = new THREE.Color()
      const tempColor2 = new THREE.Color()

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const pos1 = particleMeshes[i].position
          const pos2 = particleMeshes[j].position
          const dist = pos1.distanceTo(pos2)

          if (dist < connectionThreshold) {
            const opacity = 1 - dist / connectionThreshold

            linePositions[lineIdx * 6] = pos1.x
            linePositions[lineIdx * 6 + 1] = pos1.y
            linePositions[lineIdx * 6 + 2] = pos1.z
            linePositions[lineIdx * 6 + 3] = pos2.x
            linePositions[lineIdx * 6 + 4] = pos2.y
            linePositions[lineIdx * 6 + 5] = pos2.z

            tempColor1.copy(colorBlue).lerp(colorViolet, opacity)
            tempColor2.copy(colorViolet).lerp(colorBlue, 1 - opacity)

            lineColors[lineIdx * 6] = tempColor1.r
            lineColors[lineIdx * 6 + 1] = tempColor1.g
            lineColors[lineIdx * 6 + 2] = tempColor1.b
            lineColors[lineIdx * 6 + 3] = tempColor2.r
            lineColors[lineIdx * 6 + 4] = tempColor2.g
            lineColors[lineIdx * 6 + 5] = tempColor2.b

            lineIdx++
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIdx * 2)
      lineGeometry.attributes.position.needsUpdate = true
      lineGeometry.attributes.color.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Resize
    const onResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      particleGeo.dispose()
      lineMaterial.dispose()
      lineGeometry.dispose()
      particleMeshes.forEach(
        (m) => (m.material as THREE.MeshBasicMaterial).dispose()
      )
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        role="presentation"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
