"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export default function Logo3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera - isometric-like view
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    const leftLight = new THREE.DirectionalLight(0xffffff, 1.5);
    leftLight.position.set(-10, 5, 5);
    scene.add(leftLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
    backLight.position.set(0, 5, -10);
    scene.add(backLight);

    const accentLight = new THREE.PointLight(0xf15a27, 1, 30);
    accentLight.position.set(5, 5, 5);
    scene.add(accentLight);

    // ✅ STRUCTURE:
    // pivot (spins on Y) → wrapper (holds tilted model) → fbx (the model)
    const pivot = new THREE.Group();
    scene.add(pivot);

    const wrapper = new THREE.Group();
    pivot.add(wrapper);

    // Load FBX model
    const loader = new FBXLoader();
    
    loader.load(
      '/models/logo.fbx',
      (fbx) => {
        console.log('Model loaded!');

        // Step 1: Scale the model
        const box = new THREE.Box3().setFromObject(fbx);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;
        fbx.scale.set(scale, scale, scale);

        // Step 2: Apply the face rotation BEFORE centering
        fbx.rotation.x = -Math.PI / 2;

        // Step 3: Update the model's matrix so bounding box is correct
        fbx.updateMatrixWorld(true);

        // Step 4: Now calculate center with the rotation applied
        const rotatedBox = new THREE.Box3().setFromObject(fbx);
        const center = rotatedBox.getCenter(new THREE.Vector3());

        // Step 5: Offset to center the rotated model
        fbx.position.set(-center.x, -center.y, -center.z);

        // Apply materials
        fbx.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const name = child.name.toLowerCase();
            
            if (name.includes('wall') || name.includes('generic')) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xf15a27,
                metalness: 0.3,
                roughness: 0.4,
                emissive: 0xf15a27,
                emissiveIntensity: 0.1
              });
            } 
            else if (name.includes('floor')) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.5,
              });
            } 
            else {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xf15a27,
                metalness: 0.3,
                roughness: 0.4,
              });
            }
            
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Add to wrapper
        wrapper.add(fbx);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // ✅ Animation - pivot spins on Y axis
    // Model rotates around its own center because it's centered inside wrapper
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      pivot.rotation.y += 0.008;
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
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