import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { EDGE_COLOR, NODE_COLOR, PULSE_COLOR, type SceneParams } from './constants';

interface Edge {
  a: number;
  b: number;
  dist: number;
}

interface Pulse {
  edge: number;
  t: number;
  speed: number;
}

function buildGraph(params: SceneParams) {
  const nodes: THREE.Vector3[] = [];
  // Fibonacci sphere with mild radial jitter · gives a clustered "latent space" feel
  for (let i = 0; i < params.nodeCount; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / params.nodeCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    const r = params.radius * (0.55 + 0.45 * Math.random());
    nodes.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.85,
        r * Math.cos(phi)
      )
    );
  }

  const edges: Edge[] = [];
  for (let i = 0; i < params.nodeCount; i++) {
    for (let j = i + 1; j < params.nodeCount; j++) {
      const d = nodes[i].distanceTo(nodes[j]);
      if (d < params.edgeThreshold) {
        edges.push({ a: i, b: j, dist: d });
      }
    }
  }

  return { nodes, edges };
}

export default function NeuralNetwork({ params }: { params: SceneParams }) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const pulseInstancesRef = useRef<THREE.InstancedMesh>(null);

  const { nodes, edges } = useMemo(() => buildGraph(params), [params]);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach((e, i) => {
      const a = nodes[e.a];
      const b = nodes[e.b];
      arr.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
    });
    return arr;
  }, [edges, nodes]);

  const pulses = useMemo<Pulse[]>(
    () =>
      Array.from({ length: params.pulseCount }, () => ({
        edge: Math.floor(Math.random() * Math.max(1, edges.length)),
        t: Math.random(),
        speed: 0.3 + Math.random() * 0.6,
      })),
    [params.pulseCount, edges.length]
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);
  // Track autonomous rotation and parallax offset separately so mouse-follow
  // doesn't fight the steady drift.
  const autoRot = useRef({ x: 0, y: 0 });
  const parallax = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Steady autonomous rotation (accumulates each frame)
    autoRot.current.y += delta * 0.06;
    autoRot.current.x += delta * 0.015;

    // Mouse parallax — smoothly lerp the offset toward the pointer target
    const targetY = state.pointer.x * 0.35;
    const targetX = -state.pointer.y * 0.25;
    parallax.current.x += (targetX - parallax.current.x) * 0.05;
    parallax.current.y += (targetY - parallax.current.y) * 0.05;

    // Apply combined rotation
    groupRef.current.rotation.x = autoRot.current.x + parallax.current.x;
    groupRef.current.rotation.y = autoRot.current.y + parallax.current.y;

    // Edge shimmer
    if (lineMatRef.current) {
      const t = state.clock.elapsedTime;
      lineMatRef.current.opacity = 0.18 + Math.sin(t * 0.7) * 0.05;
    }

    // Pulse traversal — fade in/out to 0 so teleports happen invisibly
    if (pulseInstancesRef.current && edges.length > 0) {
      pulses.forEach((p, i) => {
        p.t += delta * p.speed * 0.3;
        if (p.t >= 1) {
          p.t = 0;
          p.edge = Math.floor(Math.random() * edges.length);
          p.speed = 0.3 + Math.random() * 0.6;
        }
        const e = edges[p.edge];
        tmpA.copy(nodes[e.a]);
        tmpB.copy(nodes[e.b]);
        const pos = tmpA.lerp(tmpB, p.t);
        dummy.position.copy(pos);
        // sin(t*π) is 0 at t=0 and t=1 → invisible at endpoints, peaks at t=0.5
        const sc = Math.sin(p.t * Math.PI) * 0.13;
        dummy.scale.setScalar(sc);
        dummy.updateMatrix();
        pulseInstancesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      pulseInstancesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMatRef}
          color={EDGE_COLOR}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </lineSegments>

      {/* Nodes */}
      <Instances limit={params.nodeCount}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={NODE_COLOR} />
        {nodes.map((p, i) => (
          <Instance
            key={i}
            position={[p.x, p.y, p.z]}
            scale={0.6 + Math.random() * 0.9}
          />
        ))}
      </Instances>

      {/* Halo around nodes for bloom */}
      <Instances limit={params.nodeCount}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color={NODE_COLOR} transparent opacity={0.18} />
        {nodes.map((p, i) => (
          <Instance key={i} position={[p.x, p.y, p.z]} />
        ))}
      </Instances>

      {/* Travelling pulses */}
      <instancedMesh
        ref={pulseInstancesRef}
        args={[undefined, undefined, params.pulseCount]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={PULSE_COLOR} />
      </instancedMesh>
    </group>
  );
}
