const Task = require('../models/Task-Model')
const asyncWrap = require('express-async-wrap')
const { createCustomError } = require('../errors/custom-error')


const getAllTasks = asyncWrap(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ result: tasks.length, tasks: tasks })
})


const createTask = asyncWrap(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})


const getTask = asyncWrap(async (req, res, next) => {
    const { id: id } = req.params
    const task = await Task.findOne({ _id: id })
    if (!task) {
        return next(createCustomError(`no task with this id ${id}`, 404))
    }
    res.status(200).json({ task })
})


const updateTask = asyncWrap(async (req, res) => {
    const { id: id } = req.params
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError(`no task with this id ${id}`, 404))
    }
    res.status(200).json({ task: task, status: 'success' })
})


const deleteTask = asyncWrap(async (req, res) => {
    const { id: id } = req.params
    const task = await Task.findOneAndDelete({ _id: id })
    if (!task) {
        return next(createCustomError(`no task with this id ${id}`, 404))
    }
    res.status(200).json({ tasks: null, status: 'success' })
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}