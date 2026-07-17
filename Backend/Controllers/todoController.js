const Todo = require("../models/userModel");

const createTodo = async (req, res) => {
  try {
    const { task, priority } = req.body;

    if (!task || !priority) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const todo = new Todo({
      task,
      priority,
      path: {
        url: req.file.path,
        type: req.file.mimetype,
      },
    });

    await todo.save();

    return res.status(201).json({
      success: true,
      message: "Todo created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create todo.",
      error: error.message,
    });
  }
};

const alltodos = async (req, res) => {
  try {
    const data = await Todo.find({});

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch todos.",
      error: error.message,
    });
  }
};

const todoDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedData = await Todo.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete todo.",
      error: error.message,
    });
  }
};

const todoUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.file) {
      req.body.path = {
        url: req.file.path,
        type: req.file.mimetype,
      };
    }

    const data = await Todo.findByIdAndUpdate(
      { _id: id },
      req.body,
      { returnDocument: "after" }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update todo.",
      error: error.message,
    });
  }
};

module.exports = {
  createTodo,
  alltodos,
  todoDelete,
  todoUpdate,
};