"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const SocketServer_1 = __importDefault(require("./SocketServer"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)(process.env.SECRET_KEY));
const httpServer = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"],
    },
    /* options */
});
exports.io.on("connection", (socket) => {
    (0, SocketServer_1.default)(socket);
});
//Router
app.use("/api", require("./routers/index"));
app.use("/api", require("./routers/users"));
mongoose_1.default.connect(`${process.env.MONGODB_URL}`, {}, (err) => {
    if (err)
        throw err;
    console.log("MongoDB to connected");
});
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log("Server running on port ", PORT);
});
// server listen
// app.listen(PORT, () => {
//   console.log("Server running on port ", PORT);
// });
