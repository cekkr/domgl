import * as THREE from './libs/three.module.js';

// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// Create a simple cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Setup the worker
const worker = new Worker('./worker.js');

worker.onmessage = function (e) {
    // Update the cube's rotation based on worker calculations
    cube.rotation.x = e.data.rotationX;
    cube.rotation.y = e.data.rotationY;
};

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Post a message to the worker to perform heavy computations
    worker.postMessage({ time: performance.now() });

    renderer.render(scene, camera);
}

animate();
