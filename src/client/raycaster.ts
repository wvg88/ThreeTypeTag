import { Raycaster } from "three";



function raycast(vector:any, camera:any, collision_object:any, pointerObject:any, targetObject:any){
    
    const raycaster:any = new Raycaster()
    raycaster.tick = () => {
        raycaster.setFromCamera(vector,camera)
        window.addEventListener('mousedown', onMouseDown)
        const intersects = raycaster.intersectObject(collision_object)
        if (intersects.length > 0){
            pointerObject.position.copy( intersects[ 0 ].point )


        }else{
            pointerObject.position.set(0,0,0)
        }
    
        function onMouseDown(event:any){
            if (intersects.length > 0)
            {   targetObject.position.copy( intersects[ 0 ].point )
                targetObject.position.y += 3
            }
        }
    }
    return raycaster
}




    


export { raycast }