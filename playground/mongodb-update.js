const { MongoClient, ObjectId } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
////CRUD
///CREATE -> Insert
///Read -> Fetch,Find
///Update -> 
///Delete ->

// Database Name
const dbName = 'Moein-db';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');

    const updateData = await collection.updateOne({
        _id: ObjectId('63779e17b4f368ac690b8266')
    },
        { $set: { name: 'parviz parastooyi', age: 5 } });// the following code examples can be pasted here...
    console.log({ updateData })



    const incrementData = await collection.updateOne({
        _id: ObjectId('63779e246cb53eb05d9af1e3')
    },
        { $inc: { age: 5 } });// the following code examples can be pasted here...
    console.log({ incrementData })




    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

