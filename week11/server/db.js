require("dotenv").config();

const { MongoClient } = require("mongodb");

let uri = "mongodb+srv://%USERNAME%:%PASSWORD%@cluster0.q68ri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    uri = uri.replace(/%USERNAME%/g, process.env.USERNAME);
    uri = uri.replace(/%PASSWORD%/g, process.env.PASSWORD);
    
const client = new MongoClient(uri);

async function connectDb() {
    await client.connect();
    console.log("Connected to MongoDB!");
}

async function insertRecord(database, collection, document) {
    const result = await client
    .db(database)
    .collection(collection)
    .insertOne(document);

    console.log(`Record inserted with id : ${result.insertedId}`);
    return result;
}


async function selectRecord(database, collection, query) {
    const result = await client
    .db(database)
    .collection(collection)
    .findOne(query)
    return result;
}

async function selectRecords(database, collection, query) {
    const result = await client
    .db(database)
    .collection(collection)
    .find(query)
    .limit(parseInt(process.env.QUERY_LIMIT))
    .sort({surname : -1})
    .toArray();
    return result;
}

async function deleteRecord(database, collection, query) {
    const result = await client
    .db(database)
    .collection(collection)
    .deleteOne(query)
    return result;
}

module.exports.connectDb = connectDb;
module.exports.insertRecord = insertRecord;
module.exports.deleteRecord = deleteRecord;
module.exports.selectRecord = selectRecord;
module.exports.selectRecords = selectRecords;

