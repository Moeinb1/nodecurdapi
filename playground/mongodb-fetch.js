const { MongoClient } = require('mongodb');
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

    const find = await collection.find();// the following code examples can be pasted here...
    console.log({ find })
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

