import * as THREE from 'three'
import { World } from './world'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import { io } from 'socket.io-client'





const scene = new THREE.Scene()
const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
const lineStart = new THREE.Vector3()
const lineEnd = new THREE.Vector3()
const points:any = []


async function main(){
    const container:any = document.querySelector('#container')

    const world = new World(container)

    await world.init()

    world.start()
}
main().catch((err) => {
    console.error(err)
})




//const controls = new MapControls(camera, renderer.domElement)

const box = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const myObject3D = new THREE.Object3D()

const floorGeo = new THREE.PlaneGeometry(20,20, 10, 10)
const floor = new THREE.Mesh( floorGeo, material )

floor.rotation.x = -90 * Math.PI/180
scene.add(floor)

const linegeo = new THREE.BufferGeometry().setFromPoints( points )
const line = new THREE.Line( linegeo, new THREE.LineBasicMaterial({color:0xffffff}) )
scene.add( line )



//window.addEventListener('resize', onWindowResize, false)
//window.addEventListener('pointermove', onPointerMove)
//window.addEventListener('click', onmousedown)


const sphereGeometry = new THREE.SphereGeometry( 0.1, 32, 32 )
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial )
					scene.add( sphere );

function onPointerMove(event:any){
    
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1

    
}

function onmousedown(event:any){
    
    myObject3D.position.copy(sphere.position)

}



let myId = ''
let timestamp = 0
const clientCubes: { [id: string]: THREE.Mesh } = {}
const socket = io()
/*socket.on('connect', function () {
   // console.log('connect')
})
socket.on('disconnect', function (message: any) {
   // console.log('disconnect ' + message)
})*/
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
/*socket.on('clients', (clients: any) => {
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
                        10
                    )
                    .start()
                    
            }
        }
    })
    ;(document.getElementById('pingStats') as HTMLDivElement).innerHTML = pingStatsHtml
})*/
socket.on('removeClient', (id: string) => {
    scene.remove(scene.getObjectByName(id) as THREE.Object3D)
})

const stats = Stats()
//document.body.appendChild(stats.dom)

const animate = function () {
    requestAnimationFrame(animate)

    //controls.update()
    ///raycaster.setFromCamera( pointer, camera )
    
    const intersects = raycaster.intersectObject( floor )


    if ( intersects.length > 0 ) {

        sphere.position.set( 0, 0, 0 )
        
        lineStart.copy(myObject3D.position)
        points.push(lineStart)
        lineEnd.copy(intersects[ 0 ].point)
        sphere.position.copy( intersects[ 0 ].point );
        points.push(lineEnd)
        
        linegeo.setFromPoints(points)
        
    }
    
    myObject3D.lookAt(lineEnd)
    
    TWEEN.update()

    if (clientCubes[myId]) {
        //camera.lookAt(clientCubes[myId].position)
    }

    //render()

    stats.update()
}



//animate()

