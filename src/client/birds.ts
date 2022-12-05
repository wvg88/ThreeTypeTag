import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setupModel } from "./setupModel";

async function loadBirds() {
    const loader =  new GLTFLoader()


    const parrotData =  await loader.loadAsync('./assets/Parrot.glb')

    const parrot = setupModel(parrotData)

    parrot.position.set(0,0,-10)
    parrot.scale.set(0.05,0.05,0.05)
    
    
    return { parrot }
    
}

export { loadBirds }