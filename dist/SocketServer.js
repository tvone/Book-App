"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketServer = (socket) => {
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
exports.default = SocketServer;
