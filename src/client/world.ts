import { BufferGeometry, Line, LineBasicMaterial, Mesh, Object3D, Vector2, Vector3 } from "three";
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

        const {mainLight,ambientLight, lightHelper} = createLights()
   
        this.scene.add(mainLight, ambientLight, lightHelper)

        
        const resizer = new Resizer(container,this.camera,this.renderer)
        const controls = createControls(this.camera, this.renderer.domElement)
        this.animate.updatables.push(controls)
        
        
       //const sockets = clients(cube)
       
       
        
    }
    async init(){


        


        const {parrot} = await loadBirds()
        this.animate.updatables.push(parrot)
        this.scene.add(parrot)

        const sphere = createSphere()
        this.scene.add(sphere)
        const pointer = new Vector2()
        Pointer(pointer)

        const floor = createFloor()
        this.scene.add(floor)
        const raycaster = raycast(pointer,this.camera,this.scene,floor,sphere, parrot)
        this.animate.updatables.push(raycaster)
        


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