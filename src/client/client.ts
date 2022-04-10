import { stringify } from 'querystring'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const amount = 20
const size = 5
let particles: any = []

const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xcccccc )

const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 10000)
camera.position.z = 2000

const renderer = new THREE.WebGLRenderer()
const container = document.getElementById('container')
container?.appendChild(renderer.domElement)




renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls(camera, renderer.domElement)
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

let INTERSECTED: any 


const geometry = new THREE.BufferGeometry()
const points:any = []

const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: false,
})

const sg = new THREE.SphereBufferGeometry(1,8,8)
const sprite = new THREE.Sprite(new THREE.SpriteMaterial( { color:'#fff' } ))
sprite.scale.set(100,20,0)



for ( var i =0; i < amount; i ++){
    const particle = new THREE.Mesh(sg, material)
    const point = new THREE.Vector3()
    point.x = Math.random() * 8 - 1 
    point.y = Math.random() * 4 - 1 
    point.z = Math.random() * 2 - 1
    point.normalize()
    point.multiplyScalar( Math.random() * amount + 450)

    particle.position.x = point.x
    particle.position.y = point.y
    particle.position.z = point.z
    
    //particle.position.x = Math.random() * 8 - 1
    //particle.position.y = Math.random() * 4 - 1
    //particle.position.z = Math.random() * 2 - 1
    //particle.position.normalize()
    //particle.position.multiplyScalar( Math.random() * amount + 450 )
    particle.scale.x = particle.scale.y = particle.scale.z = size
    particles.push( particle )
    
    points.push(point)
    scene.add (particle)
}
geometry.setFromPoints(points)
const line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xe0ffe0 } ) )


document.addEventListener( 'mousemove', onDocumentMouseMove, false)
function onDocumentMouseMove(event: MouseEvent) {
				mouse.x = (event.clientX / window.innerWidth ) * 2 - 1
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


function animate() {
    requestAnimationFrame(animate)

    //cube.rotation.x += 0.01
    //cube.rotation.y += 0.01

    controls.update()

    render()
}


const UItext = document.createElement("div")
UItext.setAttribute('id','textarea')
/*
let url = window.location.href + 'data.json'
let stringified:any;
async function obj() {
     let j = await (await fetch(url)).json()
     stringified = j.name  
} 
obj() */
const Content = document.createTextNode("Hello World")





function render() {
    raycaster.setFromCamera( mouse, camera );

    let intersects = raycaster.intersectObjects(particles, true)
    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[ 0 ].object ) {
            if ( INTERSECTED ) INTERSECTED.scale.x = INTERSECTED.scale.y = INTERSECTED.scale.z = size
            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.scale.x = INTERSECTED.scale.y = INTERSECTED.scale.z = size * 3
           
            UItext.appendChild(Content)
            document.body.appendChild(UItext)
            UItext.style.visibility = "visible"
            sprite.position.set( INTERSECTED.position.x +50,INTERSECTED.position.y+20,INTERSECTED.position.z)
            scene.add(sprite)
            scene.add(line)
           
        }
    }else{
        if ( INTERSECTED ) INTERSECTED.scale.x = INTERSECTED.scale.y = INTERSECTED.scale.z = size 
            INTERSECTED = null
            scene.remove(sprite)
            scene.remove(line)
        UItext.style.visibility = "hidden"
        
       
    }
    renderer.render(scene, camera)
}
animate()
