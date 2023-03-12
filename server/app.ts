import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import SocketServer from "./SocketServer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser(process.env.SECRET_KEY));

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
  },
  /* options */
});

io.on("connection", (socket: Socket) => {
  SocketServer(socket);
});

//Router
app.use("/api", require("./routers/index"));
app.use("/api", require("./routers/users"));

mongoose.connect(`${process.env.MONGODB_URL}`, {}, (err) => {
  if (err) throw err;
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
