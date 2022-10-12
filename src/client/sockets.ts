import { io } from "socket.io-client";

let myId = ''
const socket = io()

function connect(){
    socket.on('connect',function(){
        console.log('connect')
    })
}
function disconnect(){
    socket.on('disconnect', function(message:any){
        console.log('disconnect')
    })
}
function id(id:any, obj:any){
    socket.on('id',(id:any)=>{
        myId = id
        setInterval(() => {
            socket.emit('update', {
                t: Date.now(),
                p: obj.position,
                r: obj.rotation,
            })
        }, 50)
    })
}

function clients(models:any){

    socket.on('clients',(clients:any) => {
        Object.keys(clients).forEach((p) => {
            if (!models[p]) {
               
            }
            }
        )
    })

}

export { connect, disconnect, id, clients}