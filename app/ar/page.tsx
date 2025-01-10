"use client";
import React, { useEffect, useRef } from 'react';
//@ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import Webcam from 'react-webcam';

const ARPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const webcamRef = useRef<Webcam | null>(null);

    useEffect(() => {
        const initThreeJS = () => {
            if (!canvasRef.current) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
            renderer.setSize(window.innerWidth, 600);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
            directionalLight.position.set(5, 5, 5).normalize();
            scene.add(directionalLight);

            const loader = new GLTFLoader();
            loader.load('/arrowNew.glb', (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap>; }) => {
                console.log('Model loaded:', gltf);
                scene.add(gltf.scene);
            }, undefined, (error: any) => {
                console.error('An error occurred while loading the model:', error);
            });

            camera.position.z = 8;

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.screenSpacePanning = false;
            controls.maxPolarAngle = Math.PI / 2;

            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            };

            animate();
        };

        initThreeJS();
    }, []);

    return (
        <div className="relative w-full h-[100vh]">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    facingMode: "environment",
                }}
                className="absolute top-0 left-0 w-full h-full"
            />
            <canvas ref={canvasRef} className="absolute bottom-[-5vh] left-0 w-full h-full" />
        </div>
    );
};

export default ARPage;