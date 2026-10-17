"use client";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  Environment,
  Html,
  useGLTF,
} from "@react-three/drei";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";

import * as THREE from "three";



/* ============================================================
   GLOBAL CONSTANTS
============================================================ */

const PLANET_TARGET_DIAMETER = 7.5;  // was 6 — bigger so it fills the box instead of floating small in empty space
const PLANE_TARGET_DIAMETER = 1.6;

const PLANET_SCALE_MULTIPLIER = 1;
const PLANE_SCALE_MULTIPLIER = 1;

const CAMERA_DISTANCE = 10.5; // was 15 — camera sits closer, so the globe reads bigger/closer instead of small & distant

const AUTO_ROTATION_SPEED = 0.07;

const PLANE_SPEED = 0.15;
const FLY_RADIUS = 3;        // was 3.6 — tighter orbit to match the closer camera
const PLANE_HEIGHT = 0.5;
const ORBIT_TILT = 0.18;
const BANK_ANGLE = 0.3;
const ORIENTATION_SMOOTHING = 6;

const PLANE_NOSE_OFFSET_Y = Math.PI;

const SYSTEM_CENTER = new THREE.Vector3(0, 0, 0);



/* ============================================================
   MOUSE DRAG SYSTEM
============================================================ */

function useDraggable(ref: React.RefObject<THREE.Group>) {

  const { camera, gl } = useThree();

  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    []
  );

  const mouse = useMemo(() => new THREE.Vector2(), []);

  const intersection = useMemo(
    () => new THREE.Vector3(),
    []
  );

  const dragging = useRef(false);

  useEffect(() => {

    const canvas = gl.domElement;

    function pointerDown(e: PointerEvent) {

      if (!ref.current) return;

      mouse.x =
        (e.clientX / window.innerWidth) * 2 - 1;

      mouse.y =
        -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const hits = raycaster.intersectObject(
        ref.current,
        true
      );

      if (hits.length > 0) {

        dragging.current = true;

        canvas.style.cursor = "grabbing";
      }
    }

    function pointerMove(e: PointerEvent) {

      if (!dragging.current) return;

      if (!ref.current) return;

      mouse.x =
        (e.clientX / window.innerWidth) * 2 - 1;

      mouse.y =
        -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      raycaster.ray.intersectPlane(
        plane,
        intersection
      );

      ref.current.position.lerp(
        intersection,
        0.18
      );
    }

    function pointerUp() {

      dragging.current = false;

      canvas.style.cursor = "grab";
    }

    canvas.addEventListener(
      "pointerdown",
      pointerDown
    );

    window.addEventListener(
      "pointermove",
      pointerMove
    );

    window.addEventListener(
      "pointerup",
      pointerUp
    );

    return () => {

      canvas.removeEventListener(
        "pointerdown",
        pointerDown
      );

      window.removeEventListener(
        "pointermove",
        pointerMove
      );

      window.removeEventListener(
        "pointerup",
        pointerUp
      );
    };

  }, [camera, gl, plane, raycaster, ref]);

  return dragging;
}



/* ============================================================
   SOFT FLOATING
============================================================ */

function useFloatingMotion(
  ref: React.RefObject<THREE.Group>,
  amount = 0.15,
  speed = 0.4
) {

  useFrame((state) => {

    if (!ref.current) return;

    ref.current.position.y +=
      Math.sin(
        state.clock.elapsedTime * speed
      ) *
      amount *
      0.02;
  });
}



/* ============================================================
   AUTO-FIT SCALE
============================================================ */

function useAutoFitScale(
  object: THREE.Object3D,
  targetDiameter: number
) {

  return useMemo(() => {

    const box = new THREE.Box3().setFromObject(object);

    const size = new THREE.Vector3();

    box.getSize(size);

    const largestDimension =
      Math.max(size.x, size.y, size.z) || 1;

    return targetDiameter / largestDimension;

  }, [object, targetDiameter]);

}



/* ============================================================
   CONTINUOUS ROTATION
============================================================ */

function useSlowRotation(
  ref: React.RefObject<THREE.Group>,
  speed = AUTO_ROTATION_SPEED
) {

  useFrame((_, delta) => {

    if (!ref.current) return;

    ref.current.rotation.y +=
      delta * speed;
  });
}



/* ============================================================
   REALISTIC LIGHTING
============================================================ */

function SceneLights() {

  return (
    <>

      <ambientLight
        intensity={1.8}
      />

      <directionalLight
        position={[8, 10, 6]}
        intensity={3}
        castShadow
      />

      <directionalLight
        position={[-10, -5, -5]}
        intensity={1.5}
      />

      <pointLight
        position={[0, 4, 8]}
        intensity={2}
        color="#ffffff"
      />

      <pointLight
        position={[8, -4, -8]}
        intensity={1}
        color="#ffe3aa"
      />

    </>
  );
}



/* ============================================================
   LOADING SCREEN
============================================================ */

function Loader() {

  return (
    <Html center>

      <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">

        <div
          className="absolute inset-0 rounded-full border-4 border-navy-900/10 border-t-gold-500 animate-spin"
          style={{ animationDuration: "1.4s" }}
        />

        <div
          className="absolute inset-3 rounded-full border-4 border-navy-900/10 border-b-emerald-400 animate-spin"
          style={{ animationDuration: "2s", animationDirection: "reverse" }}
        />

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white p-2 shadow-xl sm:h-20 sm:w-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="Loading"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

      </div>

    </Html>
  );
}



/* ============================================================
   PLANET SYSTEM
============================================================ */

function Planet({
  positionRef,
}: {
  positionRef: React.RefObject<THREE.Vector3>;
}) {

  const { scene } = useGLTF("/models/planet.glb");

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const autoScale = useAutoFitScale(clonedScene, PLANET_TARGET_DIAMETER);

  const group = useRef<THREE.Group>(null);

  const dragging = useDraggable(group);

  useFloatingMotion(group, 0.18, 0.6);

  useSlowRotation(group, 0.05);

  useFrame((state, delta) => {

    if (!group.current) return;

    if (!dragging.current) {

      const t = state.clock.elapsedTime;

      const targetX =
        SYSTEM_CENTER.x +
        Math.sin(t * 0.15) * 0.4;

      const targetY =
        SYSTEM_CENTER.y +
        Math.sin(t * 0.35) * 0.35;

      const targetZ =
        SYSTEM_CENTER.z +
        Math.cos(t * 0.18) * 0.35;

      group.current.position.lerp(

        new THREE.Vector3(
          targetX,
          targetY,
          targetZ
        ),

        delta * 1.2

      );

    }

    if (positionRef.current) {
      positionRef.current.copy(group.current.position);
    }

  });

  return (

    <group
      ref={group}
      scale={autoScale * PLANET_SCALE_MULTIPLIER}
    >

      <primitive object={clonedScene} />

    </group>

  );

}



/* ============================================================
   PARTICLES / STARS
============================================================ */

function PlanetParticles() {

  const points =
    useRef<THREE.Points>(null);

  const positions =
    useMemo(() => {

      const array =
        new Float32Array(3000);

      for (
        let i=0;
        i<3000;
        i+=3
      ){

        array[i]=
          (Math.random()-0.5)*16;

        array[i+1]=
          (Math.random()-0.5)*16;

        array[i+2]=
          (Math.random()-0.5)*10;

      }

      return array;

    },[]);

  useFrame((_,delta)=>{

    if(!points.current) return;

    points.current.rotation.y+=
      delta*0.01;

    points.current.rotation.x+=
      delta*0.003;

  });

  return(

    <points ref={points}>

      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          count={positions.length/3}
          array={positions}
          itemSize={3}
        />

      </bufferGeometry>

      <pointsMaterial
        size={0.03}
        transparent
        opacity={0.45}
        color="#d8ecff"
      />

    </points>

  );

}

function FloatingStars(){

  const stars=[];

  for(let i=0;i<80;i++){

    stars.push(

      <mesh
        key={i}
        position={[
          (Math.random()-0.5)*24,
          (Math.random()-0.5)*12,
          (Math.random()-0.5)*10,
        ]}
      >

        <sphereGeometry
          args={[0.02,8,8]}
        />

        <meshBasicMaterial
          color="white"
        />

      </mesh>

    );

  }

  return<>{stars}</>;

}



/* ============================================================
   PLANE
============================================================ */

function Plane({
  planetPosition,
}: {
  planetPosition: React.RefObject<THREE.Vector3>;
}) {

  const { scene } = useGLTF("/models/plane.glb");

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const autoScale = useAutoFitScale(clonedScene, PLANE_TARGET_DIAMETER);

  const group = useRef<THREE.Group>(null);

  const angleRef = useRef(0);

  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  const tmpMatrix = useMemo(() => new THREE.Matrix4(), []);

  useFrame((_, delta) => {

    if (!group.current) return;

    const center = planetPosition.current ?? SYSTEM_CENTER;

    angleRef.current += delta * PLANE_SPEED;

    const angle = angleRef.current;

    const pathPoint = (a: number) => {

      const p = new THREE.Vector3(
        Math.cos(a) * FLY_RADIUS,
        0,
        Math.sin(a) * FLY_RADIUS
      );

      p.applyAxisAngle(new THREE.Vector3(1, 0, 0), ORBIT_TILT);

      p.y += PLANE_HEIGHT;

      p.add(center);

      return p;

    };

    const position = pathPoint(angle);

    const lookAhead = pathPoint(angle + 0.01);

    group.current.position.copy(position);

    tmpMatrix.lookAt(position, lookAhead, up);

    const headingQuat = new THREE.Quaternion().setFromRotationMatrix(tmpMatrix);

    const bankQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      BANK_ANGLE
    );

    headingQuat.multiply(bankQuat);

    const smoothing = 1 - Math.exp(-delta * ORIENTATION_SMOOTHING);

    group.current.quaternion.slerp(headingQuat, smoothing);

  });

  return (

    <group ref={group} scale={autoScale * PLANE_SCALE_MULTIPLIER}>

      <group rotation={[0, PLANE_NOSE_OFFSET_Y, 0]}>

        <primitive object={clonedScene} />

      </group>

    </group>

  );

}



/* ============================================================
   PLANET GROUP
============================================================ */

function PlanetSystem({
  positionRef,
}: {
  positionRef: React.RefObject<THREE.Vector3>;
}) {

  return(

    <>

      <PlanetParticles/>

      <Planet positionRef={positionRef} />

      <FloatingStars/>

    </>

  );

}



/* ============================================================
   CAMERA EFFECT
============================================================ */

function SmoothCamera(){

  const {camera}=useThree();

  useFrame((state)=>{

    camera.position.z+=
      (
        CAMERA_DISTANCE-
        camera.position.z
      )*0.03;

    camera.position.x+=
      (
        state.pointer.x*0.6-
        camera.position.x
      )*0.02;

    camera.position.y+=
      (
        state.pointer.y*0.4-
        camera.position.y
      )*0.02;

    camera.lookAt(0,0,0);

  });

  return null;

}



/* ============================================================
   FINAL HERO GLOBE

   `variant="hero"` (default) keeps the original floating box that
   sits absolutely positioned on the right of the hero section.
   `variant="card"` fills 100% of whatever parent container it's
   placed in — this is what lets the exact same globe+plane system
   be dropped into the showcase card in the media grid below the
   hero, with no separate model or duplicate logic.
============================================================ */

export default function HeroGlobe({
  variant = "hero",
}: {
  variant?: "hero" | "card";
}) {

  const planetPosition = useRef(SYSTEM_CENTER.clone());

  const wrapperClass =
    variant === "card"
      ? "relative h-full w-full"
      : `
        pointer-events-none relative mx-auto h-[220px] w-[220px]
        sm:h-[300px] sm:w-[300px]
        lg:absolute lg:right-6 lg:top-1/2 lg:mx-0 lg:h-[440px] lg:w-[440px] lg:-translate-y-1/2
      `;

  return (

    <div className={wrapperClass}>

      <div className="pointer-events-auto h-full w-full">

      <Canvas camera={{ position: [0, 0, CAMERA_DISTANCE], fov: 45 }}>

        <Suspense fallback={<Loader />}>

          <SceneLights />

          <Environment preset="sunset" />

          <PlanetSystem positionRef={planetPosition} />

          <Plane planetPosition={planetPosition} />

          <SmoothCamera />

        </Suspense>

      </Canvas>

      </div>

    </div>

  );

}

useGLTF.preload("/models/planet.glb");
useGLTF.preload("/models/plane.glb");