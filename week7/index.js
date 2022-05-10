require("dotenv").config();

const { MongoClient } = require("mongodb");

async function main() {
  let uri =
    "mongodb+srv://%USERNAME%:%PASSWORD%@cluster0.q68ri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  uri = uri.replace(/%USERNAME%/g, process.env.USERNAME);
  uri = uri.replace(/%PASSWORD%/g, process.env.PASSWORD);

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // List all the Databases
    await listDatabases(client);

    await createListing(client, {
      name: "Norman",
      summary: "A charming loft in Paris",
      bedrooms: 1,
      bathrooms: 1,
    });

    await updateSomething(client);

    await selectSomething(client);

    await deleteSomething(client);

    await selectSomething(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  let databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function selectSomething(client) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find({ name: "Norman" })
    .toArray();
  console.log(result);
}

async function createListing(client, newListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function updateSomething(client) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne(
      { name: "Norman" },
      { $set: { summary: "2" } },
      { upsert: true }
    );
  console.log(result);
}

async function deleteSomething(client) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteOne({ name: "Norman" });
  console.log(result);
}
