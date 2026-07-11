const express = require("express");
const app = express();

const mongoose = require("mongoose");
const {createTodo, alltodos, todoDelete, todoUpdate} = require("./Controllers/todoController");
const multer = require("multer")
const cors = require("cors")

mongoose.connect("mongodb+srv://litondata:MongoDB01766@testcluster.yvhccxb.mongodb.net/Todo?appName=TestCluster").then(() => {
  console.log("Database Connected");





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    let uniqueName = 'img' + '-' + Date.now()
    cb(null, uniqueName + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });




  app.use(express.json());
  app.use(cors());
  app.use('/uploads', express.static('uploads'));

  app.post("/create/todo", upload.single("image"), createTodo)
  app.get("/alltodos", alltodos)
  app.delete("/tododelete/:id", todoDelete)
  app.post("/todoupdate/:id", todoUpdate)

  app.listen(5000, () => {
    console.log("Server is Running...");
  });
})