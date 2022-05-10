const fs = require("fs");
const util = require("util");
const readPromise = util.promisify(fs.readFile);
const writePromise = util.promisify(fs.writeFile);

// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// writeFile("promise.txt", "Write in Promise.txt", "utf8")
//   .then(() => readFile("promise.txt", "utf8"))
//   .then((result) => console.log(result))
//   .catch((error) => {
//     // Handle error in Write / Read
//     console.log("Some Write error");
//   });

const main = async () => {
    await writePromise("file.txt", "Hello World!");
    let result = await readPromise("file.txt", "utf-8");
    console.log(result);
}

main();