

function Pointer(vector:any){

    window.addEventListener('pointermove', onPointerMove)

    function onPointerMove(event:any){
       
        vector.x = ( event.clientX / window.innerWidth ) * 2 - 1
        vector.y = - ( event.clientY / window.innerHeight ) * 2 + 1
        return vector
        
    }

}

export { Pointer }