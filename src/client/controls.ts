import { MapControls } from "three/examples/jsm/controls/OrbitControls";

function createControls(camera:any, canvas:any){
    const controls:any = new MapControls(camera, canvas)

    controls.enableDamping = true

    controls.dampingFactor = 0.1

    controls.tick = () => controls.update()

    return controls
}

export { createControls }