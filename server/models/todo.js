var Todo = mongoose.model('Todo', {
    text: {

        type: String,
        required: true,
        trim: true,
        minlength: 2,
        // uppercase: true,

    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: 1
    }

})
module.exports = { Todo }