import { BoxBufferGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, SphereBufferGeometry } from "three";

function createCube(){
    const geometry = new BoxBufferGeometry(1,1,1)
    const material = new MeshStandardMaterial({color:'lightgreen'})
    const cube:any = new Mesh(geometry, material)
    cube.position.set(0,0,0)
    cube.tick = (delta:number) => {
        cube.rotation.y += 30 * Math.PI/180 * delta
    }
    cube.castShadow = true
    return cube
}

function createFloor(){
    const geometry = new PlaneGeometry(150,150, 10, 10)
    
    const material = new MeshStandardMaterial({color:0xffffff})
    const floor = new Mesh( geometry, material )

    floor.rotation.x = -90 * Math.PI/180
    floor.position.set(0,-3,0)
         
    return floor
}

function createSphere(){
    const geometry = new SphereBufferGeometry(0.1)
    const material = new MeshBasicMaterial({color:0xff0000})
    const sphere = new Mesh(geometry, material)

    return sphere
}

export { createCube, createFloor, createSphere }