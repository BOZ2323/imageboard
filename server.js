
// const secrets = require('./secrets.json');
// const dbUrl = 'postgres:' + secrets.dbUser + ':' + secrets.dbPassword + '@localhost:5432/sage';
// const {spicedling, password}  = require('./secrets');
// const dbUrl = `postgres:${spicedling}:${password}@localhost:5432/petition`;
// const db = spicedPg(dbUrl);
///////////////////////////
const express = require("express");
const app = express();
const db = require("./db.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
console.log("server.js");
app.use(express.static("./public"));


app.get("/image", (req, res) => {
    return db
        .getImages()
        .then(result => {
            console.log("getImages result :", result);

            res.json(result);
        })
        .catch(function(err) {
            console.log("err in GET /images :", err.message);
        });
});

app.listen(8080, () => console.log(`Glistening!`));
