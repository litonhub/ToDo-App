const express = require("express");
const router = express.Router();
const { createTodo, alltodos, todoDelete, todoUpdate } = require("../controllers/todoController");
const upload = require("../utils/storage");

router.post("/create/todo", upload.single("image"), createTodo);
router.get("/alltodos", alltodos);
router.delete("/tododelete/:id", todoDelete);
router.post("/todoupdate/:id", upload.single("image"), todoUpdate);

module.exports = router;