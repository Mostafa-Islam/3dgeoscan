"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

// ============================================
// ANIMATION CONFIGURATION - Adjust these values
// ============================================
const CONFIG = {
  // Angles where the model will stop (in degrees for easier understanding)
  // The model will stop at each of these angles in sequence
  stopAngles: [268], // degrees
  
  // How long to pause at each stop (in milliseconds)
  pauseDuration: 3000, // 3 seconds
  
  // How long the easing animation takes (in milliseconds)
  easeDuration: 800, // 0.8 seconds for smooth stop/start
  
  // Base rotation speed (radians per frame)
  rotationSpeed: 0.018,
  
  // How long to rotate before stopping (in milliseconds)
  // Set to null to stop at next angle automatically
  rotationDuration: 4000, // 4 seconds of rotation, or null
};

// Convert degrees to radians
const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

// Easing functions
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number): number => t * t * t;
const easeInOutCubic = (t: number): number => 
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Animation states
type AnimationState = 'rotating' | 'easing_to_stop' | 'paused' | 'easing_to_start';

export default function Logo3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (isInitializedRef.current) return;

    const existingCanvas = containerRef.current.querySelector('canvas');
    if (existingCanvas) {
      containerRef.current.removeChild(existingCanvas);
    }

    const initScene = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      if (width === 0 || height === 0) {
        requestAnimationFrame(initScene);
        return;
      }

      isInitializedRef.current = true;

      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(8, 8, 8);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;
      containerRef.current?.appendChild(renderer.domElement);

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

      // Pivot structure
      const pivot = new THREE.Group();
      scene.add(pivot);

      const wrapper = new THREE.Group();
      pivot.add(wrapper);

      // ============================================
      // ANIMATION STATE
      // ============================================
      let animationState: AnimationState = 'rotating';
      let currentAngleIndex = 0;
      let rotationStartTime = Date.now();
      let easeStartTime = 0;
      let easeStartAngle = 0;
      let easeTargetAngle = 0;
      let pauseStartTime = 0;
      
      // Convert stop angles to radians and sort them
      const stopAnglesRad = CONFIG.stopAngles
        .map(degreesToRadians)
        .sort((a, b) => a - b);

      // Normalize angle to 0 - 2π range
      const normalizeAngle = (angle: number): number => {
        angle = angle % (Math.PI * 2);
        if (angle < 0) angle += Math.PI * 2;
        return angle;
      };

      // Find the next stop angle from current rotation
      const findNextStopAngle = (currentAngle: number): number => {
        const normalized = normalizeAngle(currentAngle);
        
        for (let i = 0; i < stopAnglesRad.length; i++) {
          if (stopAnglesRad[i] > normalized + 0.01) { // Small threshold to avoid stopping immediately
            currentAngleIndex = i;
            return stopAnglesRad[i];
          }
        }
        
        // Wrap around to first angle (add 2π to make it the "next" angle)
        currentAngleIndex = 0;
        return stopAnglesRad[0] + Math.PI * 2;
      };

      // Get the target angle for the current stop
      const getCurrentStopAngle = (): number => {
        return stopAnglesRad[currentAngleIndex];
      };

      // Check if it's time to start stopping
      const shouldStartStopping = (): boolean => {
        if (CONFIG.rotationDuration !== null) {
          // Time-based: stop after rotating for specified duration
          return Date.now() - rotationStartTime >= CONFIG.rotationDuration;
        } else {
          // Angle-based: stop when approaching next stop angle
          const currentAngle = normalizeAngle(pivot.rotation.y);
          const nextStop = normalizeAngle(findNextStopAngle(pivot.rotation.y));
          const distance = nextStop - currentAngle;
          
          // Start easing when we're close enough to stop smoothly
          const stoppingDistance = CONFIG.rotationSpeed * (CONFIG.easeDuration / 16);
          return distance > 0 && distance <= stoppingDistance;
        }
      };

      // Load FBX model
      const loader = new FBXLoader();

      loader.load(
        '/models/logo.fbx',
        (fbx) => {
          console.log('Model loaded!');

          const box = new THREE.Box3().setFromObject(fbx);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 4 / maxDim;
          fbx.scale.set(scale, scale, scale);

          fbx.rotation.x = -Math.PI / 2;
          fbx.updateMatrixWorld(true);

          const rotatedBox = new THREE.Box3().setFromObject(fbx);
          const center = rotatedBox.getCenter(new THREE.Vector3());
          fbx.position.set(-center.x, -center.y, -center.z);

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
              } else if (name.includes('floor')) {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xffffff,
                  metalness: 0.2,
                  roughness: 0.5,
                });
              } else {
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

          wrapper.add(fbx);
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
        }
      );

      // ============================================
      // ANIMATION LOOP
      // ============================================
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        
        const now = Date.now();

        switch (animationState) {
          case 'rotating':
            // Normal rotation
            pivot.rotation.y += CONFIG.rotationSpeed;
            
            // Check if we should start stopping
            if (shouldStartStopping()) {
              animationState = 'easing_to_stop';
              easeStartTime = now;
              easeStartAngle = pivot.rotation.y;
              easeTargetAngle = findNextStopAngle(pivot.rotation.y);
              
              // Ensure target is ahead of current position
              while (easeTargetAngle <= easeStartAngle) {
                easeTargetAngle += Math.PI * 2;
              }
              
              console.log(`Easing to stop at ${(normalizeAngle(easeTargetAngle) * 180 / Math.PI).toFixed(1)}°`);
            }
            break;

          case 'easing_to_stop':
            // Smooth deceleration to target angle
            const stopProgress = Math.min((now - easeStartTime) / CONFIG.easeDuration, 1);
            const easedStopProgress = easeOutCubic(stopProgress);
            
            pivot.rotation.y = easeStartAngle + (easeTargetAngle - easeStartAngle) * easedStopProgress;
            
            if (stopProgress >= 1) {
              pivot.rotation.y = easeTargetAngle;
              animationState = 'paused';
              pauseStartTime = now;
              console.log(`Paused at ${(normalizeAngle(pivot.rotation.y) * 180 / Math.PI).toFixed(1)}°`);
            }
            break;

          case 'paused':
            // Wait for pause duration
            if (now - pauseStartTime >= CONFIG.pauseDuration) {
              animationState = 'easing_to_start';
              easeStartTime = now;
              easeStartAngle = pivot.rotation.y;
              console.log('Starting rotation again...');
            }
            break;

          case 'easing_to_start':
            // Smooth acceleration from stop
            const startProgress = Math.min((now - easeStartTime) / CONFIG.easeDuration, 1);
            const easedStartProgress = easeInCubic(startProgress);
            
            // Gradually increase rotation speed
            pivot.rotation.y += CONFIG.rotationSpeed * easedStartProgress;
            
            if (startProgress >= 1) {
              animationState = 'rotating';
              rotationStartTime = now;
              
              // Move to next angle index for next stop
              currentAngleIndex = (currentAngleIndex + 1) % stopAnglesRad.length;
            }
            break;
        }

        renderer.render(scene, camera);
      };

      animate();

      // Resize handler
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (!containerRef.current || !rendererRef.current) return;
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          if (w === 0 || h === 0) return;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }, 100);
      };

      window.addEventListener('resize', handleResize);

      (containerRef.current as any).__cleanup = () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        renderer.dispose();
        scene.clear();
      };
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          if (!isInitializedRef.current) {
            initScene();
          }
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    initScene();

    return () => {
      resizeObserver.disconnect();
      isInitializedRef.current = false;

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      if (containerRef.current) {
        const cleanup = (containerRef.current as any).__cleanup;
        if (cleanup) cleanup();

        const canvas = containerRef.current.querySelector('canvas');
        if (canvas) {
          containerRef.current.removeChild(canvas);
        }
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
      style={{
        minWidth: '100%',
        minHeight: '100%',
        position: 'relative'
      }}
    />
  );
}