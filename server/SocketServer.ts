import { Socket } from "socket.io";

const SocketServer = (socket: Socket) => {
  socket.on("joinRoom", (id) => {
    socket.join(id);
  });
  socket.on("outRoom", (id) => {
    socket.leave(id);
  });
  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
};

export default SocketServer;
