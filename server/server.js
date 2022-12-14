var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

var express = require('express')
var bodyparser = require('body-parser')
var { ObjectID } = require('mongodb')
var app = express();

app.use(bodyparser.json());


app.post('/todos', (req, res) => {

    var todo = new Todo({

        text: req.body.text
    })

    todo.save().then((doc) => {
        res.status(200).send(doc)
    }, (e) => {
        res.status(400).send(e)
    })

})


/// http://yoursite.com/ldsmlmas
app.get('/todos/:id', (req, res) => {

    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({ todo })
    }).catch((e) => {
        res.status(404).send();
    })

})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e)
    })
})

app.listen(3000, () => {
    console.log('start on port 3000')
})



module.exports = { app }