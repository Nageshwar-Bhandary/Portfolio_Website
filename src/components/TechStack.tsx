import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "../context/PortfolioContext";

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const { skills } = usePortfolio();
  const [isActive, setIsActive] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const techstackEl = document.getElementById("techstack");
      if (!techstackEl) return;
      const rect = techstackEl.getBoundingClientRect();
      // Activate physics when the techstack section is at least partially in the viewport
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      setIsActive(isVisible);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Refresh GSAP ScrollTrigger after the component has mounted and rendered
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(refreshTimeout);
    };
  }, []);

  // Dynamically generate CanvasTextures for the skill names
  const textures = useMemo(() => {
    return skills.map((name) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Texture();

      // Background - matching website dark theme
      ctx.fillStyle = "#0c0812";
      ctx.beginPath();
      ctx.arc(256, 256, 256, 0, Math.PI * 2);
      ctx.fill();

      // Website accent border outline
      ctx.strokeStyle = "#c2a4ff";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(256, 256, 248, 0, Math.PI * 2);
      ctx.stroke();

      // Text styling
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let fontSize = 48;
      if (name.length > 25) {
        fontSize = 28;
      } else if (name.length > 18) {
        fontSize = 32;
      } else if (name.length > 12) {
        fontSize = 38;
      }

      ctx.font = `600 ${fontSize}px "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

      // Multiline text wrapping logic
      const words = name.split(" ");
      if (words.length > 1 && name.length > 10) {
        const lines = [];
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
          if ((currentLine + " " + words[i]).length > 12) {
            lines.push(currentLine);
            currentLine = words[i];
          } else {
            currentLine += " " + words[i];
          }
        }
        lines.push(currentLine);

        const lineHeight = fontSize * 1.25;
        const startY = 256 - ((lines.length - 1) * lineHeight) / 2;
        lines.forEach((line, index) => {
          ctx.fillText(line, 256, startY + index * lineHeight);
        });
      } else {
        ctx.fillText(name, 256, 256);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    });
  }, [skills]);

  const spheres = useMemo(() => {
    if (!skills.length) return [];
    return [...Array(30)].map((_, i) => {
      const skillIndex = i % skills.length;
      return {
        scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
        skillIndex,
      };
    });
  }, [skills]);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, [textures]);

  return (
    <div className="techstack" id="techstack">
      <h2>My Techstack</h2>

      <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{ alpha: false, stencil: false, depth: false, antialias: false }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => {
            state.gl.toneMappingExposure = 1.5;
            state.gl.setClearColor("#0b080c");
          }}
          className="tech-canvas"
        >
          <ambientLight intensity={1} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {spheres.map((props, i) => (
              <SphereGeo
                key={i}
                scale={props.scale}
                material={materials[props.skillIndex]}
                isActive={isActive}
              />
            ))}
          </Physics>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
          <EffectComposer enableNormalPass={false}>
            <N8AO quality="performance" color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        </Canvas>
    </div>
  );
};

export default TechStack;
