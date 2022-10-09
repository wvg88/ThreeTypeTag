class Resizer {
    container:Element
    camera
    renderer
    constructor(container:Element, camera:any, renderer:any){
        this.container = container
        this.camera = camera
        this.renderer = renderer
        
        camera.aspect = container.clientWidth / container.clientHeight
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        camera.updateProjectionMatrix()


        window.addEventListener('resize', () => {
            
            renderer.setSize(container.clientWidth, container.clientHeight)
            camera.aspect = container.clientWidth / container.clientHeight
            
        })
        

       
       
        
    }
}
export { Resizer }