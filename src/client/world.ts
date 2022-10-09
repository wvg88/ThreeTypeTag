import { Animate } from "./Animate";
import { loadBirds } from "./birds";
import { createCamera } from "./camera"
import { createControls } from "./controls";
import { createLights } from "./lights";
import { createCube } from "./model";
import { createRenderer } from "./renderer"
import { Resizer } from "./Resizer";
import { createScene } from "./scene";





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

        const {mainLight,ambientLight} = createLights()
        const cube = createCube()
        this.animate.updatables.push(cube)
        this.scene.add(cube, mainLight, ambientLight)
        
        const resizer = new Resizer(container,this.camera,this.renderer)
        const controls = createControls(this.camera, this.renderer.domElement)
        this.animate.updatables.push(controls)
        
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