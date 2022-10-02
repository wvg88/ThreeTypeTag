import * as THREE from 'three'
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import { io } from 'socket.io-client'
import { Line } from 'three'


const scene = new THREE.Scene()
const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
const path = new THREE.Line3()
const lineStart = new THREE.Vector3()
const lineEnd = new THREE.Vector3()
const points:any = []

const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)



//const controls = new OrbitControls(camera, renderer.domElement)
const controls = new MapControls(camera, renderer.domElement)

const box = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})



const myObject3D = new THREE.Object3D()


const gridHelper = new THREE.GridHelper(25, 25)
gridHelper.position.y = -0.5
//scene.add(gridHelper)

const floorGeo = new THREE.PlaneGeometry(20,20, 10, 10)
const floor = new THREE.Mesh( floorGeo, material )

floor.rotation.x = -90 * Math.PI/180;

scene.add(floor)
const linegeo = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( linegeo, new THREE.LineBasicMaterial({color:0xffffff}) );
scene.add( line );
camera.position.y = 5;
camera.position.z = 4

window.addEventListener('resize', onWindowResize, false)
window.addEventListener('pointermove', onPointerMove)
window.addEventListener('click', onmousedown)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
const sphereGeometry = new THREE.SphereGeometry( 0.1, 32, 32 );
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
					scene.add( sphere );

function onPointerMove(event:any){
    
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    
}

function onmousedown(event:any){

    myObject3D.position.copy(sphere.position)
    myObject3D.rotation.y += 1
}
let myId = ''
let timestamp = 0
const clientCubes: { [id: string]: THREE.Mesh } = {}
const socket = io()
socket.on('connect', function () {
    console.log('connect')
})
socket.on('disconnect', function (message: any) {
    console.log('disconnect ' + message)
})
socket.on('id', (id: any) => {
    myId = id
    setInterval(() => {
        socket.emit('update', {
            t: Date.now(),
            p: myObject3D.position,
            r: myObject3D.rotation,
        })
    }, 50)
})
socket.on('clients', (clients: any) => {
    let pingStatsHtml = 'Socket Ping Stats<br/><br/>'
    Object.keys(clients).forEach((p) => {
        timestamp = Date.now()
        pingStatsHtml += p + ' ' + (timestamp - clients[p].t) + 'ms<br/>'
        if (!clientCubes[p]) {
            clientCubes[p] = new THREE.Mesh(box, material)
            clientCubes[p].name = p
            scene.add(clientCubes[p])
        } else {
            if (clients[p].p) {
                new TWEEN.Tween(clientCubes[p].position)
                    .to(
                        {
                            x: clients[p].p.x,
                            y: clients[p].p.y,
                            z: clients[p].p.z,
                        },
                        50
                    )
                    .start()
            }
            if (clients[p].r) {
                new TWEEN.Tween(clientCubes[p].rotation)
                    .to(
                        {
                            x: clients[p].r._x,
                            y: clients[p].r._y,
                            z: clients[p].r._z,
                        },
                        50
                    )
                    .start()
            }
        }
    })
    ;(document.getElementById('pingStats') as HTMLDivElement).innerHTML = pingStatsHtml
})
socket.on('removeClient', (id: string) => {
    scene.remove(scene.getObjectByName(id) as THREE.Object3D)
})

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(myObject3D.position, 'x', -5, 5)
cubePositionFolder.add(myObject3D.position, 'z', -5, 5)
cubePositionFolder.open()
const cubeRotationFolder = cubeFolder.addFolder('Rotation')
cubeRotationFolder.add(myObject3D.rotation, 'x', 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(myObject3D.rotation, 'y', 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(myObject3D.rotation, 'z', 0, Math.PI * 2, 0.01)
cubeRotationFolder.open()
cubeFolder.open()
console.log(linegeo)
const animate = function () {
    requestAnimationFrame(animate)

    controls.update()
    raycaster.setFromCamera( pointer, camera );
    
    const intersects = raycaster.intersectObject( floor );
    lineStart.copy(myObject3D.position)
    points.push(lineStart)
    // Toggle rotation bool for meshes that we clicked
    if ( intersects.length > 0 ) {

        sphere.position.set( 0, 0, 0 );
        //helper.lookAt( intersects[ 0 ].face.normal );
       //console.log(intersects[ 0 ].point)
        lineEnd.copy(intersects[ 0 ].point)
        sphere.position.copy( intersects[ 0 ].point );
        path.set(lineStart,lineEnd)
        points.push(lineEnd)
    }
    
    linegeo.setFromPoints(points)


    TWEEN.update()

    if (clientCubes[myId]) {
       // camera.lookAt(clientCubes[myId].position)
    }

    render()

    stats.update()
}

const render = function () {
    renderer.render(scene, camera)
}

animate()

