const Todo = require("../Models/userModel")

const createTodo = async (req, res) => {
    const { task, status, priority } = req.body


    if (!task || !priority) {
        return res.send({
            success: false,
            message: "Please fill the all filed"
        })
    }

    const todo = new Todo({
        task: task,
        priority: priority,
        path: {
            url: req.file.path,
            type: req.file.mimetype
        }
    })

    await todo.save()
    return res.send({
        success: true,
        message: "ToDo Created"
    })
}

const alltodos = async (req, res) => {
    let data = await Todo.find({})

    res.send({
        success: true,
        message: "Todo Collected",
        data: data
    })
}

const todoDelete = async (req, res) => {
    let { id } = req.params
    await Todo.findByIdAndDelete(id)

    res.send({
        success: true,
        message: "Todo Deleted",
    })
}

let todoUpdate = async (req, res) => {
    const { id } = req.params
    let data = await Todo.findByIdAndUpdate({ _id: id }, req.body)

    res.send({
        success: true,
        message: "Todo Updated",
    })
}


module.exports = { createTodo, alltodos, todoDelete, todoUpdate }