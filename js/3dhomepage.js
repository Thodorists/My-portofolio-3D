import * as THREE from '../node_modules/three/build/three.module.js'
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { CSS2DRenderer, CSS2DObject } from 'https://cdn.jsdelivr.net/npm/three@0.131.1/examples/jsm/renderers/CSS2DRenderer.js'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 9

const ambientLight = new THREE.AmbientLight(0xffffff, 3) // Soft global light
scene.add(ambientLight)

const canvas2 = document.querySelector('#canvas2')
const canvas3 = document.querySelector('#canvas3')
const homepage = document.querySelector('.homepage')

const renderer = new THREE.WebGLRenderer({canvas2, alpha: true})
renderer.setSize(canvas2.clientWidth, canvas2.clientHeight)
renderer.domElement.appendChild(canvas2)
homepage.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(4, 4, 4)
const material = new THREE.MeshPhysicalMaterial({ 
    color: 0xff0000,
    emissive: 0x000000, // No self-lighting
    roughness: 0.1, // Smooth surface
    metalness: 0.8, // High reflectivity
    clearcoat: 1, // Extra gloss
    clearcoatRoughness: 0
})
const cube = new THREE.Mesh(geometry, material);
scene.add(cube)


const controls = new OrbitControls(camera, renderer.domElement)



// const loader2 = new GLTFLoader();
// loader2.load('/models/rock.glb', (gltf) => {
//     const model = gltf.scene;
//     model.position.set(40, 0, -40); // Adjust position
//     model.scale.set(80, 30, 70);    // Adjust scale if needed
//     scene.add(model);
// }, 
// (xhr) => {
//     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
// }, 
// (error) => {
//     console.error('Error loading model:', error);
// })


let resizeTimeout
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
        const canvasWidth = homepage.clientWidth
        const canvasHeight = homepage.clientHeight
        const aspect = canvasWidth / canvasHeight
        camera.aspect = aspect;
        camera.updateProjectionMatrix()
        renderer.setSize(canvasWidth, canvasHeight)
    }, 50)
})


function animate(){
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    controls.update()
    renderer.render(scene,camera)
}
animate()