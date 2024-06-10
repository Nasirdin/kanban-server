const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");

const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api", userRouter);
app.use("/api", taskRouter);

server.listen(PORT, () => console.log(`Ура! сервер работает :) || PORT: ${PORT}`));

module.exports = { app, io };