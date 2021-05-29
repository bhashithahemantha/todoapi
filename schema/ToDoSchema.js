const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    id: String,
    title: String,
    task: String,
    isCompleted: Boolean,
});

const ToDo = mongoose.model('ToDo', ToDoSchema);
module.exports = ToDo;
