import { AnimationMixer, BufferGeometry, Line, Line3, LineBasicMaterial, LineDashedMaterial, MathUtils, MeshDistanceMaterial, Raycaster, Vector3 } from "three";
import { Tween, TWEEN } from 'three/examples/jsm/libs/tween.module.min';




function raycast(vector:any, camera:any,scene:any, collision_object:any, pointerObject:any, targetObject:any){
    
    const lineStart = new Vector3
    const lineEnd = new Vector3
    const points:Vector3[] = []
    const linegeo:BufferGeometry = new BufferGeometry().setFromPoints( points )
    const l = new Line3(lineStart,lineEnd)
    
    const line = new Line(linegeo, new LineBasicMaterial({color:0x000000}))
    scene.add(line)
    
    const raycaster:any = new Raycaster()
    raycaster.tick = (delta:number) => {
        
        raycaster.setFromCamera(vector,camera)
        window.addEventListener('mousedown', onMouseDown)
        const intersects = raycaster.intersectObject(collision_object)
        if (intersects.length > 0){
            pointerObject.position.copy( intersects[ 0 ].point )
            lineStart.copy(targetObject.position)
            points.push(lineStart)
            lineEnd.copy(intersects[ 0 ].point)
            points.push(lineEnd)
            linegeo.setFromPoints(points)
            lineEnd.y += 3
           

        }
    
        function onMouseDown(event:any){
            if (intersects.length > 0)
            {    
                TWEEN.removeAll()

                const velocity = 50
                
              
                    new TWEEN.Tween(targetObject.position).to({
                        x:lineEnd.x,
                        y:lineEnd.y,
                        z:lineEnd.z,
                    },l.distance()*velocity)
                    .start()
                    .easing(TWEEN.Easing.Linear.None)
     
                    
                  
                    targetObject.lookAt(lineEnd.x,lineEnd.y,lineEnd.z)
                  
                     


                }
                
                
                
                
            
        }
    }
    return raycaster
}




    


export { raycast }