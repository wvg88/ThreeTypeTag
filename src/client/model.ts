import { BoxBufferGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

function createCube(){
    const geometry = new BoxBufferGeometry(1,1,1)
    const material = new MeshStandardMaterial({color:0xffffff})
    const cube:any = new Mesh(geometry, material)
    cube.position.set(0,0,0)
    cube.tick = (delta:number) => {
        cube.rotation.y += 30 * Math.PI/180 * delta
    }

    return cube
}

export { createCube }