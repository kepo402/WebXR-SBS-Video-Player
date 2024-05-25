import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/webxr/VRButton.js';

let camera, scene, renderer;

init();

function init() {
    const container = document.getElementById('container');
    const video = document.getElementById('video');
    const videoSource2D = document.getElementById('videoSource2D');
    const enterVRButton = document.getElementById('enterVRButton');
    const exitVRButton = document.getElementById('exitVRButton');

    // Set video sources
    videoSource2D.src = 'dirtbike.mp4';
    video.src = 'dirtbike_sbs.mp4';

    // Initialize WebGL Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local');
    container.appendChild(renderer.domElement);

    // Set up Three.js scene
    scene = new THREE.Scene();

    // Initialize Three.js camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);
    scene.add(camera);

    // Add VR button
    container.appendChild(VRButton.createButton(renderer));

    // Event listeners
    enterVRButton.addEventListener('click', enterVR);
    exitVRButton.addEventListener('click', exitVR);

    // Resize handling
    window.addEventListener('resize', onWindowResize);

    // Start rendering loop
    animate();
}

function enterVR() {
    const enterVRButton = document.getElementById('enterVRButton');
    const exitVRButton = document.getElementById('exitVRButton');

    enterVRButton.style.display = 'none';
    exitVRButton.style.display = 'block';

    // Play SBS video
    const video = document.getElementById('video');
    video.play();
}

function exitVR() {
    const enterVRButton = document.getElementById('enterVRButton');
    const exitVRButton = document.getElementById('exitVRButton');

    enterVRButton.style.display = 'block';
    exitVRButton.style.display = 'none';

    // Stop video
    const video = document.getElementById('video');
    video.pause();
}

function animate() {
    renderer.setAnimationLoop(() => {
        render();
    });
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}




function exitXR() {
    // Stop video playback
    videoElement.pause();

    // Hide XR content
    xrContent.style.display = 'none';

    // Reset XR renderer
    renderer.xr.enabled = false;
    renderer.xr.setReferenceSpaceType(null);
    renderer.xr.session = null;

    // Show 2D video
    videoElement.style.display = 'block';
}




