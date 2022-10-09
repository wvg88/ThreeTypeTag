import { AmbientLight, DirectionalLight, Light, HemisphereLight} from "three";

function createLights(){
    const ambientLight = new HemisphereLight('skyblue','blue', 2)
    const mainLight = new DirectionalLight(0x666666, 8)

    mainLight.position.set(10, 10, 10)

    return {mainLight, ambientLight}
}

export { createLights }