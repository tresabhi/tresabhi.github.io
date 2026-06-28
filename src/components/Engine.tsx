import { mauveDark } from "@radix-ui/colors";
import { Box } from "@radix-ui/themes";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import {
  EdgesGeometry,
  Fog,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  type Group,
} from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { clamp, lerp } from "three/src/math/MathUtils.js";
import { useOnScreen } from "../hooks/useOnScreen";

const near0 = 2;
const near1 = 7.5;
const far0 = 4.125;
const far1 = 10;

export function Engine() {
  const canvas = useRef<HTMLCanvasElement>(null!);
  const onScreen = useOnScreen(canvas);
  const t = clamp(window.innerWidth / window.innerHeight - 0.5, 0, 1);
  const fov = lerp(50, 25, t);
  const x = lerp(8, 5, t);
  const y = lerp(0, 5, t);
  const z = lerp(-0, -8, t);

  return (
    <Box position="absolute" width="100%" height="100%" top="0" left="0">
      <Box position="absolute" top="0" left="0" width="100%" height="100%">
        <Canvas
          ref={canvas}
          frameloop={onScreen ? "always" : "never"}
          camera={{
            fov,
            position: new Vector3(x, y, z).multiplyScalar(0.7),
          }}
          scene={{
            fog: new Fog(mauveDark.mauve3, near0, far0),
          }}
        >
          <Suspense fallback={null}>
            <FogManager />
            <Model />
          </Suspense>
        </Canvas>
      </Box>
    </Box>
  );
}

function FogManager() {
  const T = 1;

  useFrame(({ clock, scene }) => {
    const t = Math.min(1, clock.elapsedTime / T);
    const fog = scene.fog as Fog | undefined;

    if (!fog) return;

    fog.near = near0 + (near1 - near0) * t;
    fog.far = far0 + (far1 - far0) * t;
  });

  return null;
}

const outlineMaterial = new LineBasicMaterial({
  color: mauveDark.mauve7,
  linewidth: 1,
});

const fillMaterial = new MeshBasicMaterial({
  color: mauveDark.mauve7,
  depthWrite: true,
  transparent: true,
  opacity: 2 ** -2,
});

function Model() {
  const model = useLoader(GLTFLoader, "/engine.glb");
  const scene = useMemo(() => {
    const scene = model.scene.clone(true);

    scene.children.forEach((child) => {
      if (child instanceof Mesh) {
        child.renderOrder = -1;
        child.material = fillMaterial;

        return;
      }

      child.remove(child.children[0]);

      [...child.children].forEach((grandChild) => {
        if (!(grandChild instanceof Mesh)) {
          return;
        }

        child.remove(grandChild);

        const edgesGeometry = new EdgesGeometry(grandChild.geometry, 80);
        const lineSegments = new LineSegments(edgesGeometry, outlineMaterial);

        lineSegments.position.copy(grandChild.position);
        lineSegments.rotation.copy(grandChild.rotation);
        lineSegments.scale.copy(grandChild.scale);

        child.add(lineSegments);
      });
    });

    return scene;
  }, [model]);
  const wrapper = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!wrapper.current) return;
    wrapper.current.rotation.x = clock.elapsedTime / 20;
  });

  return (
    <group ref={wrapper} position={[1.9, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}
