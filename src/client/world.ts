import { Mesh, Object3D, Vector2, Vector3 } from "three";
import { Animate } from "./Animate";
import { loadBirds } from "./birds";
import { createCamera } from "./camera"
import { createControls } from "./controls";
import { createLights } from "./lights";
import { createCube, createFloor, createSphere } from "./model";
import { Pointer } from "./pointer";
import { raycast } from "./raycaster";
import { createRenderer } from "./renderer"
import { Resizer } from "./Resizer";
import { createScene } from "./scene";
import { clients } from "./sockets";



class World{

    private camera;
    private scene;
    private renderer;
    container;
    private animate;
    
    constructor(container: Element){
        this.camera = createCamera()
        this.scene = createScene()
        this.renderer = createRenderer()
        this.container = container.append(this.renderer.domElement)
        this.animate = new Animate(this.camera,this.scene, this.renderer)

        const pointer = new Vector2()
        Pointer(pointer)

        const floor = createFloor()
        this.scene.add(floor)
        
        const {mainLight,ambientLight, lightHelper} = createLights()
        const cube = createCube()
       
        this.animate.updatables.push(cube)
        this.scene.add(cube, mainLight, ambientLight, lightHelper)

        const sphere = createSphere()
        this.scene.add(sphere)
        
        const raycaster = raycast(pointer,this.camera,floor,sphere, cube)
        this.animate.updatables.push(raycaster)
        
        
        const resizer = new Resizer(container,this.camera,this.renderer)
        const controls = createControls(this.camera, this.renderer.domElement)
        this.animate.updatables.push(controls)
        
        
       //const sockets = clients(cube)
       
       
        
    }
    async init(){
        const {parrot} = await loadBirds()
        this.animate.updatables.push(parrot)
        this.scene.add(parrot)


    }

    render(){
        
        this.renderer.render(this.scene, this.camera)
    }
    start(){
        
        this.animate.start()
    }
    stop(){
        this.animate.stop()
    }
}

export { World }