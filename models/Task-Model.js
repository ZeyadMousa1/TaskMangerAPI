const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Must Provide Name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters']
    },
    reminder: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model('Task', TaskSchema)