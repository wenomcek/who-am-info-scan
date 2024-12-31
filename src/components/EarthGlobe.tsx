import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface EarthGlobeProps {
  targetLocation?: {
    latitude: number;
    longitude: number;
  };
}

export function EarthGlobe({ targetLocation }: EarthGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    earth: THREE.Mesh;
    controls: OrbitControls;
  }>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Earth setup
    const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
    const earthTexture = new THREE.TextureLoader().load('/earth-texture.jpg');
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: earthTexture,
      bumpScale: 0.1,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 15;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    sceneRef.current = { scene, camera, renderer, earth, controls };

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Handle location targeting
  useEffect(() => {
    if (!targetLocation || !sceneRef.current) return;

    const { earth, camera, controls } = sceneRef.current;
    const { latitude, longitude } = targetLocation;

    // Convert lat/long to 3D position
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);
    
    const targetPosition = new THREE.Vector3(
      -Math.sin(phi) * Math.cos(theta) * 8,
      Math.cos(phi) * 8,
      Math.sin(phi) * Math.sin(theta) * 8
    );

    // Animate camera to position
    const duration = 2000;
    const start = camera.position.clone();
    const startTime = Date.now();

    function updateCamera() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress < 1) {
        camera.position.lerpVectors(start, targetPosition, progress);
        requestAnimationFrame(updateCamera);
      }
    }
    
    updateCamera();
    controls.target.set(0, 0, 0);
  }, [targetLocation]);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}