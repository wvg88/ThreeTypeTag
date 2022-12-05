import { Clock } from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

const clock = new Clock()

class Animate{
    camera
    scene
    renderer
    updatables:any
    constructor(camera:any, scene:any, renderer:any ){
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.updatables = []
    }
    start(){
        this.renderer.setAnimationLoop(() => {
            this.tick()
            TWEEN.update()
            
            this.renderer.render(this.scene, this.camera)

        })
    }

    stop(){
        this.renderer.setAnimationLoop(null)
    }
    tick(){
        const delta = clock.getDelta()
        
        
        for (const object of this.updatables){
            object.tick(delta)
        }
    }
}

export{ Animate }