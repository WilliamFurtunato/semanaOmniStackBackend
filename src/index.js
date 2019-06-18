const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// permite lidar com rotas, paramemetros e respostas
const app = express();

// dividir o servidor para receber protocolo http e websocket
const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb+srv://william:furtunato@cluster0-ug9et.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors()); // permitir acesso de diferentes dominios

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
); // acessar arquivos estaticos

app.use(require("./routes"));

server.listen(3333);
