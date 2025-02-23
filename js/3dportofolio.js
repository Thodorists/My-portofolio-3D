import * as THREE from '../node_modules/three/build/three.module.js'
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { CSS2DRenderer, CSS2DObject } from 'https://cdn.jsdelivr.net/npm/three@0.131.1/examples/jsm/renderers/CSS2DRenderer.js'

// import { UnrealBloomPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/UnrealBloomPass.js'
// import { EffectComposer } from '../node_modules/three/examples/jsm/postprocessing/EffectComposer.js'
// import { RenderPass } from '../node_modules/three/examples/jsm/postprocessing/RenderPass.js'
// import { Lensflare, LensflareElement } from 'https://unpkg.com/three@0.126.1/examples/jsm/objects/Lensflare.js'

import { RGB_PVRTC_2BPPV1_Format } from 'three';

const canvas = document.querySelector('#canvas')
const container = document.querySelector('.container')
const arrowback = document.querySelector('.arrowback')
const home = document.querySelector('.home')
const homepage = document.querySelector('.homepage')
const contact = document.querySelector('.contact')
const contactpage = document.querySelector('.contactpage')
const services = document.querySelector('.services')
const servicespage = document.querySelector('.servicespage')
const about = document.querySelector('.about')
const aboutpage = document.querySelector('.aboutpage')
const projects = document.querySelector('.projects')
const projectspage = document.querySelector('.projectspage')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 9

const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 2.5
document.body.appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7) // Soft global light
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 80, 50)
pointLight.position.set(2.5, 3, 1)
pointLight.castShadow = true
scene.add(pointLight)

const loader = new THREE.CubeTextureLoader()
loader.load([
    '/Textures/back.png',
    '/Textures/front.png',
    '/Textures/top.png',
    '/Textures/right.png',
    '/Textures/left.png',
    '/Textures/bottom.png'
], function(texture) {
    // Now the texture is loaded
    scene.background = texture;
}, undefined, function(error) {
    console.error('Error loading texture:', error);
})

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false
controls.enablePan = false
controls.enableRotate = false

function music() {
    const backgroundMusic = new Audio('/audio/Atmosphere.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    backgroundMusic.play()
}

const menuCount = 11;  // Number of plates
const radius = 5;      // Radius of the circle
const speed = 0.001;    // Rotation speed

const menu3d = new Array(menuCount).fill().map((_, index) => {
    const object = new THREE.BoxGeometry(0.3, 2, 3)
    const material = new THREE.MeshPhysicalMaterial({
        color: 'white',
        metalness: 0.7,  // Higher for shininess
        roughness: 0.2,  // Lower for sharper reflections
        reflectivity: 1, // Enable reflections
        // envMap: envMap,  // Apply environment reflections
        clearcoat: 1,    // Extra glossy layer
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide
    });
    const plate = new THREE.Mesh(object, material);

    plate.castShadow = true;
    plate.receiveShadow = true;

    const object3d = new THREE.Object3D();
    object3d.add(plate);
    
    // Initial angle & position
    object3d.userData.angle = (index / menuCount) * Math.PI * 2;
    object3d.position.x = Math.cos(object3d.userData.angle) * radius;
    object3d.position.y = Math.sin(object3d.userData.angle) * radius;
    // Rotate to face center
    object3d.lookAt(0, 0, 0);
    scene.add(object3d);
    return object3d;
});

let animationEnabled = false

let angle = 0
let scaleValue = 1
const rotationSpeed = 0.09

function animateTransformations() {
    if(!animationEnabled) return

    angle -= rotationSpeed
    scaleValue -= 0.02

    if (scaleValue < 0) scaleValue = 0

    container.style.transform = `rotate(${angle}rad) scale(${scaleValue})`

    if (scaleValue > 0){
        animateTransformations()
    }
}

function toggleAnimation() {
    animationEnabled = true
    angle = 0
    scaleValue = 1
    animateTransformations()
}

function stopAnimation() {
    animationEnabled = false
}

function onanimate() {
    const Elemental = new Audio('/audio/Exploding.mp3')
    Elemental.volume = 0.1
    Elemental.play()
}
let cameraAngle = 0
const cameraSpeed = 0.0015
const cameraSpeed2 = -0.0015
const originalCameraPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
function animation(){
    toggleAnimation()
    music()
    onanimate()
    const interval = setInterval(function(){
        menu3d.forEach((object) => {
            object.userData.angle += speed + 0.070
            cameraAngle += cameraSpeed;
            camera.position.x = Math.sin(cameraAngle) * -10 // Radius of 10
            camera.position.z = Math.cos(cameraAngle) * 9
            camera.lookAt(0, 0, 0)
            object.position.z -= 0.3
            object.rotation.z -= 0.005
        })
    },16)

    setTimeout(() => {
        clearInterval(interval)
        console.log("Animation stopped after 2 seconds.")
    }, 1000)
}

function backanimation(){
    animationEnabled = false
    onanimate()
    const interval2 = setInterval(function(){
        menu3d.forEach((object) => {
            object.userData.angle -= speed + 0.070
            cameraAngle += cameraSpeed2
            camera.position.x = Math.sin(cameraAngle) * -10 // Radius of 10
            camera.position.z = Math.cos(cameraAngle) * 9
            camera.lookAt(0, 0, 0)
            object.position.z += 0.3
        })
        container.style.transform = 'rotate(0deg) scale(1)'
    },16)

    setTimeout(() => {
        clearInterval(interval2);
        stopAnimation()
        console.log("Animation stopped after 2 seconds.")
    }, 1000);
}

function click(){
    const clickSound = new Audio('/audio/Whoosh.mp3')
    clickSound.volume = 1
    clickSound.play()
}

home.addEventListener('click', () => {
    click()
    animation()
    if (typeof animation === 'function' ) {
        homepage.appendChild(arrowback)
        arrowback.addEventListener('click', backanimation)
        homepage.style.transform = 'translateX(0) scale(1)'
    }
})

contact.addEventListener('click', () => {
    click()
    animation()
    if (typeof animation === 'function' ) {
        contactpage.appendChild(arrowback)
        arrowback.addEventListener('click', backanimation)
        contactpage.style.transform = 'translateX(0) scale(1)'
    }
})

about.addEventListener('click', () => {
    click()
    animation()
    if (typeof animation === 'function' ) {
        aboutpage.appendChild(arrowback)
        arrowback.addEventListener('click', backanimation)
        aboutpage.style.transform = 'translateX(0) scale(1)'
    }
})

services.addEventListener('click', () => {
    click()
    animation()
    if (typeof animation === 'function' ) {
        servicespage.appendChild(arrowback)
        arrowback.addEventListener('click', backanimation)
        servicespage.style.transform = 'translateX(0) scale(1)'
    }
})

projects.addEventListener('click', () => {
    click()
    animation()
    if (typeof animation === 'function' ) {
        projectspage.appendChild(arrowback)
        arrowback.addEventListener('click', backanimation)
        projectspage.style.transform = 'translateX(0) scale(1)'
    }
})

arrowback.addEventListener('click', ()=> {
    click()
    backanimation()
    if(typeof backanimation === 'function'){
        arrowback.removeEventListener('click', backanimation)
        homepage.style.transform = 'translateX(130%) scale(0.5)'
        contactpage.style.transform = 'translateX(130%) scale(0.5)'
        aboutpage.style.transform = 'translateX(130%) scale(0.5)'
        servicespage.style.transform = 'translateX(130%) scale(0.5)'
        projectspage.style.transform = 'translateX(130%) scale(0.5)'
    }
})


const textureLoader = new THREE.TextureLoader()
const sunTexture = textureLoader.load('/Textures/sun.jpg')

const sunLOD = new THREE.LOD();

const lowPolySun = new THREE.Mesh(
    new THREE.SphereGeometry(5, 8, 8), // Low-resolution geometry
    new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(1, 1, 0),  // Yellow glowing color
        emissiveIntensity: 50,   // Stronger glow
        color: new THREE.Color(1, 1, 0),    // Same color as emissive for consistency
        roughness: 0.5,         // Less roughness to enhance the glow
        metalness: 0.1,         // Slightly metallic for sheen
        side: THREE.DoubleSide  // Make sure both sides are rendered
    })
);

const highPolySun = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32), // High resolution
    new THREE.MeshPhysicalMaterial({
        emissive: new THREE.Color(1, 1, 0), // Glowing effect
        emissiveIntensity: 10, // Emission strength for glow
        roughness: 0.2, // Slight roughness for shine
        clearcoat: 1, // Extra glossy layer
        clearcoatRoughness: 0.1, // Slight roughness on the glossy layer
        map: sunTexture, // Sun texture (to get realistic appearance)
        emissiveMap: sunTexture, // Makes the texture glow
        side: THREE.DoubleSide, // For rendering both sides of the sun's sphere
    })
);

// Add levels to LOD (low poly for far away, high poly when close)
sunLOD.addLevel(lowPolySun, 100); // Low-poly when farther than 100 units
sunLOD.addLevel(highPolySun, 0); // High-poly when closer

scene.add(sunLOD);

sunLOD.position.set(400,50,200) 

let resizeTimeout
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
        const canvasWidth = window.innerWidth
        const canvasHeight = window.innerHeight
        const aspect = canvasWidth / canvasHeight
        camera.aspect = aspect
        camera.updateProjectionMatrix()
        renderer.setSize(canvasWidth, canvasHeight)
    }, 50)
})

const mobile = window.matchMedia("(max-width: 1024px)")
function updateControls() {
    if (mobile.matches) {
        controls.enableRotate = false
        controls.enableZoom = true
        controls.enablePan = true
        controls.maxDistance = 500
        // camera.position.z = 17
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Get the new width and height
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight;
                
                // Adjust the aspect ratio based on the new dimensions
                const aspect = canvasWidth / canvasHeight;
                camera.aspect = aspect;
                
                // Set the renderer size and adjust pixel ratio for better mobile rendering
                renderer.setSize(canvasWidth, canvasHeight);
        
                // On mobile, set the pixel ratio for better visual quality
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
                // Update the camera's projection matrix
                camera.updateProjectionMatrix();
            }, 50); // 50ms debounce delay for resize events
        });
    } else {
        controls.enableRotate = true
        controls.enableZoom = true
        controls.enablePan = true
    }
}

updateControls()

mobile.addEventListener('change', updateControls)



function animate() {
    requestAnimationFrame(animate)

    menu3d.forEach((object) => {

        if (animationEnabled) {
            object.userData.angle += speed
        } 
        else {
            object.userData.angle -= speed
        }

        // Circular motion
        object.position.x = Math.cos(object.userData.angle) * radius
        object.position.y = Math.sin(object.userData.angle) * radius

        // Keep objects facing the center
        object.lookAt(0, 0, 0)
     })
    //  controls.target.x = Math.sin(Date.now() * 0.0005) * 2; // Move target left/right
    //  controls.target.z = Math.cos(Date.now() * 0.0005) * 2;
    renderer.render(scene, camera)
    controls.update()
}
animate();






