import { WebSocketServer,WebSocket } from "ws";

const adminClients = [];

export const initWebsocket = (server)=>{
    const wss = new WebSocketServer({server});
    wss.on("connection",(ws)=>{
        if(ws.readyState!==WebSocket.OPEN)return ;
        console.log("Socket connected");
        ws.on("message",(message)=>{
            const data = JSON.parse(message);
            if(data.role==="admin"){
                adminClients.push(ws)
            }
        })
        ws.on(error,console.error)
    })
    wss.on("close",()=>{
        console.log("Socket disconnected");
    })
}

const notifyAdmin = (payload)=>{
    adminClients.forEach((admin)=>{
        admin.send(JSON.stringify(payload));
    })
}