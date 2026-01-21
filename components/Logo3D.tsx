"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export default function Logo3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const logoRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 500;

    console.log('Container size:', width, height);

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - MOVED CLOSER
    const camera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      1000
    );
    camera.position.z = 6; // ADJUST: Moved from 8 to 6 (closer)
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup - INCREASED INTENSITY
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight1.position.set(10, 10, 10);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xf15a27, 2);
    directionalLight2.position.set(-10, 5, 5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xf15a27, 3, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Create MUCH BIGGER fallback logo
    const createFallbackLogo = () => {
      const group = new THREE.Group();
      
      const material = new THREE.MeshStandardMaterial({ 
        color: 0xf15a27,
        metalness: 0.6,
        roughness: 0.2,
        emissive: 0xf15a27,
        emissiveIntensity: 0.4
      });

      // MUCH BIGGER center sphere - INCREASED SIZE
      const sphereGeometry = new THREE.SphereGeometry(2.5, 32, 32); // Increased from 1.5 to 2.5
      const sphere = new THREE.Mesh(sphereGeometry, material);
      group.add(sphere);

      // MUCH BIGGER orbiting rings
      const ringMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf15a27,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0xf15a27,
        emissiveIntensity: 0.3
      });

      // Ring 1 - MUCH BIGGER
      const ring1 = new THREE.TorusGeometry(5, 0.25, 16, 100); // Increased from 3, 0.15
      const ringMesh1 = new THREE.Mesh(ring1, ringMaterial);
      ringMesh1.rotation.x = Math.PI / 2;
      group.add(ringMesh1);

      // Ring 2 - MUCH BIGGER
      const ring2 = new THREE.TorusGeometry(6, 0.2, 16, 100); // Increased from 3.8, 0.12
      const ringMesh2 = new THREE.Mesh(ring2, ringMaterial);
      ringMesh2.rotation.x = Math.PI / 3;
      ringMesh2.rotation.y = Math.PI / 4;
      group.add(ringMesh2);

      // Ring 3 - MUCH BIGGER
      const ring3 = new THREE.TorusGeometry(7, 0.18, 16, 100); // Increased from 4.5, 0.1
      const ringMesh3 = new THREE.Mesh(ring3, ringMaterial);
      ringMesh3.rotation.z = Math.PI / 4;
      group.add(ringMesh3);

      // Add BIGGER orbiting spheres
      for (let i = 0; i < 4; i++) {
        const smallSphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.35, 16, 16), // Increased from 0.2
          ringMaterial
        );
        const angle = (i / 4) * Math.PI * 2;
        smallSphere.position.set(
          Math.cos(angle) * 5, // Increased from 3
          0,
          Math.sin(angle) * 5
        );
        group.add(smallSphere);
      }

      console.log('Fallback logo created with BIGGER sizes');
      return group;
    };

    // Show fallback logo immediately
    const fallbackLogo = createFallbackLogo();
    logoRef.current = fallbackLogo;
    scene.add(fallbackLogo);

    // Try to load FBX model
    const loader = new FBXLoader();
    
    loader.load(
      '/models/logo.fbx',
      (fbx) => {
        console.log('FBX loaded successfully');
        
        if (logoRef.current) {
          scene.remove(logoRef.current);
        }

        const box = new THREE.Box3().setFromObject(fbx);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        fbx.position.sub(center);

        // ADJUST: MUCH bigger scale for FBX
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim; // Increased from 5 to 8
        fbx.scale.set(scale, scale, scale);

        console.log('Model size:', size);
        console.log('Applied scale:', scale);

        fbx.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf15a27,
              metalness: 0.5,
              roughness: 0.3,
              emissive: 0xf15a27,
              emissiveIntensity: 0.3
            });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        logoRef.current = fbx;
        scene.add(fbx);
      },
      (progress) => {
        if (progress.total > 0) {
          const percentComplete = (progress.loaded / progress.total) * 100;
          console.log(`Loading model: ${percentComplete.toFixed(2)}%`);
        }
      },
      (error) => {
        console.error('Error loading FBX model:', error);
        console.log('Using fallback logo instead');
      }
    );

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (logoRef.current) {
        logoRef.current.rotation.y += 0.01;
        logoRef.current.rotation.x += 0.002;
        logoRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.4; // Increased float height
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      if (logoRef.current) {
        scene.remove(logoRef.current);
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center"
      style={{ minWidth: '100%', minHeight: '100%' }}
    />
  );
}