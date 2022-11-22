
var User = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 10,
        maxlength: 32,

    }
})

module.exports = { User }