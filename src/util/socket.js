import io from "socket.io-client"

var socket = io('http://localhost:8000',{
    transports: ['websocket'],
});
socket.on("disconnected",function(err){
    localStorage.getItem("err",JSON.stringify(err))
})
socket.on('reconnect_attempt', (time) => {
    if(time > 5){
        socket.close()
    }
});

export default socket