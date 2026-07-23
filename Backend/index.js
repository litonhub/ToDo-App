require('dotenv').config()
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/databaseConfig");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

dbConnection();

app.use("/", todoRoutes);

app.listen(5000, () => {
  console.log("Server is Running...");
});