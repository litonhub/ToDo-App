const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },

    status:{
        type: String,
        enum: ['pending', 'active', 'block'],
        default: 'pending'
    },
    priority:{
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },
    path:{
    url: {
      type: String,
    },
    type: {
      type: String,
    },
  },
})

module.exports = mongoose.model("Todo", userSchema)