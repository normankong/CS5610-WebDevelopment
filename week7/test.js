const db = require("./database/database.js");

const main = async () => {
  await db.listDatabases();
};


main();