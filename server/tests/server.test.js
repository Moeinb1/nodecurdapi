const expect = require('expect')
const request = require('supertest')


const { app } = require('./../server')
const { Todo } = require('./../models/todo')

const { ObjectID, ObjectId } = require('mongodb')
const { it } = require('mocha')


const todos = [{
    _id: new ObjectId(),
    text: "first test toddo"
}, {
    _id: new ObjectId(),

    text: "second test toddo"
}]


beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
})


describe("POST /todos", () => {
    it("should create a new todo", (done) => {
        var text = "Test todo text";
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3)
                    expect(todos[2].text).toBe(text)
                    done()
                }).catch((e) => done(e));
            });
    })

    it("should not create todo with invalid body data", (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2)
                    done();
                }).catch((e) => done(e))
            })
    })
})


describe("GET /todos", () => {
    it("should get all todos", (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)
    })
})

describe("GET /todos/:id", () => {
    it("should return todo doc", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })

    it("should return 404 if todo not found", (done) => {
        var hexId = new ObjectId().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .expect(done)
    })

    it("should return for non-object ids", (done) => {

        request(app)
            .get(`/todos/1234ada`)
            .expect(404)
            .end(done)

    })

})