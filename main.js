import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

//Scene
const scene = new THREE.Scene();

//Gemometry
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83'
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Light
const light = new THREE.PointLight(0xffffff, 200, 100)
light.position.set(0, 10, 10)
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100); //0.1 & 100 are clipping options, everythign below 0.1 or over 100 are clipping
camera.position.z = 20
scene.add(camera)

//Render
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls. autoRotateSpeed = 5

//Resize ALWAYS UPDATE, ALWAYS SYNCED
window.addEventListener("resize", () => {
  //Update Size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

//LOOP, animations go here, like a game loop
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Mouse Animation Color
let mousdown = false
let rgb = []
window.addEventListener('mousedown', () => (mousdown = true))
window.addEventListener('mouseup', () => (mousdown = false))

window.addEventListener('mousemove', (e) => {
  if(mousdown){
    rgb = [
      Math.round((e.pageX / sizes.width * 255)),
      Math.round((e.pageY / sizes.height * 255)),
      150
    ]
    // Animate
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
  }
})


//GSAP 
//Timeline
const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z: 0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y: '-100%'}, {y:'0%'})
tl.fromTo('.title', {opacity:0},{opacity:1})