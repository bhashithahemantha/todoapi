var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

var toDo = require('./../schema/ToDoSchema');

//Create To-Do
router.post('/', (req, res) => {
    const { id, title, task, isCompleted } = req.body;

    var toDoAdd = new toDo({
        id: id,
        title: title,
        task: task,
        isCompleted: isCompleted
    });

    toDoAdd.save((err, todo) => {
        if (err) {
            console.log(err);

        } else {
            res.status(200).json({
                status: true,
                todo
            });
        }
    });
});

//View To-Do
router.get('/', (req, res) => {
    toDo.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                err
            });
        } else {
            res.status(200).json({
                message: 'All ToDos',
                data
            });
        }
    });
});

//Remove Single To-Do
router.delete('/:id', (req, res) => {
    toDo.deleteOne({ id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                err
            });
        } else {
            res.status(200).json({
                message: 'To-Do has been removed',
                data
            });
        }
    });
});


//Update Single To-Do
router.put('/:id', (req, res) => {
    const { isCompleted } = req.body;
    toDo.updateOne({ id: req.params.id }, { $set: { isCompleted: isCompleted } }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                err
            });
        } else {
            res.status(200).json({
                message: 'To-Do updated',
                data
            });
        }
    });
});
module.exports = router;