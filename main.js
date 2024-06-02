import * as THREE from './libs/three.module.js';

// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// Create a canvas element and its 2D context
const textureCanvas = document.createElement('canvas');
textureCanvas.width = 512;
textureCanvas.height = 512;
const context = textureCanvas.getContext('2d');

// Initialize the texture from the canvas
const texture = new THREE.CanvasTexture(textureCanvas);
const material = new THREE.MeshBasicMaterial({ map: texture });
const geometry = new THREE.PlaneGeometry(5, 5);
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Setup the worker
const worker = new Worker('./worker.js');

worker.onmessage = function (e) {
    // Update the canvas based on worker calculations
    context.clearRect(0, 0, textureCanvas.width, textureCanvas.height);
    context.fillStyle = e.data.color;
    context.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

    // Update the texture
    texture.needsUpdate = true;
};

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Post a message to the worker to perform updates
    worker.postMessage({ time: performance.now() });

    renderer.render(scene, camera);
}

animate();
