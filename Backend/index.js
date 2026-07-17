const express = require("express");
const app = express();
const { createTodo, alltodos, todoDelete, todoUpdate } = require("./controllers/todoController");
const cors = require("cors")
const dbConnection = require("./config/databaseConfig")
const upload = require("./utils/storage")


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

dbConnection()

app.post("/create/todo", upload.single("image"), createTodo)
app.get("/alltodos", alltodos)
app.delete("/tododelete/:id", todoDelete)
app.post("/todoupdate/:id", upload.single("image"), todoUpdate)


app.listen(5000, () => {
  console.log("Server is Running...");
});