import { AmbientLight, DirectionalLight, Light, HemisphereLight, DirectionalLightHelper} from "three";

function createLights(){
    const ambientLight = new HemisphereLight('skyblue','blue', 2)
    const mainLight = new DirectionalLight(0xcccccc, 4)
    const lightHelper = new DirectionalLightHelper(mainLight)
   
    mainLight.position.set(-5, 5, 0)
    mainLight.rotateZ(45*Math.PI/180)

    return {mainLight, ambientLight, lightHelper}
}

export { createLights }