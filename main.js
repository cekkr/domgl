import * as THREE from './libs/three.module.js';

// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.getElementById('canvas')
let renderer = new THREE.WebGLRenderer({ canvas: canvas, preserveDrawingBuffer: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// Create a canvas element for the texture
let textureCanvas = document.createElement('canvas');
//textureCanvas.width = 512;
//textureCanvas.height = 512;

// Initialize the texture from the canvas
const texture = new THREE.CanvasTexture(textureCanvas);
const material = new THREE.MeshBasicMaterial({ map: texture });
const geometry = new THREE.PlaneGeometry(5, 5);
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Function to render HTML to the canvas
let cycle = 0
async function renderHtmlToCanvas() {
    const htmlContent = document.getElementById('html-content');
    console.log(htmlContent); //return;
    
    await html2canvas.default(htmlContent, { /*canvas: textureCanvas,*/ width: 512, height: 512 }).then((txt) => {
        const texture = new THREE.CanvasTexture(txt);  
        material.map = texture;
        material.needsUpdate = true;
    })
    
    cycle += 1
}

renderHtmlToCanvas()

// Setup the worker
const worker = new Worker('./worker.js');

worker.onmessage = function (e) {
    console.log("worker.onmessage", e)

    // Call the function to render HTML to canvas
    renderHtmlToCanvas();
};

// Animation loop
function animate() {
    // Post a message to the worker to perform updates
    worker.postMessage({ time: performance.now() });
    //renderHtmlToCanvas()

    renderer.render(scene, camera);

    setTimeout(() => {
        animate()
    }, 1000 / 60)
}

animate();
