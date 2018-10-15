console.log("db works");

const spicedPg = require("spiced-pg");
//////////////
let secrets;
let dbUrl;
if (process.env.NODE_ENV === 'production') {
    secrets = process.env;
    dbUrl = secrets.DATABASE_URL;
} else {
    const {spicedling, password}  = require('./secrets');
    dbUrl = `postgres:${spicedling}:${password}@localhost:5432/petition`;
}
const db = spicedPg(dbUrl);



///////////////


// let secrets;
// if (process.env.NODE_ENV === "production") {
//     secrets = process.env;
// } else {
//     secrets = require("./secrets");
//
// }
// // const {spicedling, password}  = require('./secrets');
// const dbUrl =
//     process.env.DATABASE_URL ||
//     `postgres:${spicedling}:${password}@localhost:5432/petition`;
//
// const db = spicedPg(dbUrl);


exports.getImages = function() {
    return db.query(`SELECT * FROM images`).then(result => {
        return result.rows;
    });
};
