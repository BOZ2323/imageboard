
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
const s3url = require('./config.json');
const s3 = require('./s3.js');

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) { //generates a unique id
            callback(null, uid + path.extname(file.originalname)); //null instead of err, because cb. pass the cb the path where the file should go, extname gives you just the extension
        });
    }
});

var uploader = multer({ //you call multer and pass it an obj with the obj just created. you give it limits, when to reject the file, eg: filesize
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});


///////////////////////////
const express = require("express");
const app = express();
const db = require("./db.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("public"));

app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
    // If nothing went wrong the file is already in the uploads directory
    console.log(req.body);

    const imgUrl = s3url.s3Url + req.file.filename;
    console.log("********",imgUrl);
    console.log("s3url", s3url);
    db.upload(imgUrl, req.body.username, req.body.title, req.body.desc)
        .then(result => {
            res.json(result.rows);
        });
});
//////////////////////////// zoom /////////

app.get('/zoom/:id', function(req, res) {
    db.zoom(req.params.id)//url, username, title, description
        .then(result => {
            res.json(result.rows);
        })
        .catch(function(err) {
        });
});
////////////////////// showcomments //////////////////

app.get('/comments/:id', function(req, res) {
    db.comments(req.params.id)
        .then(result => {
            res.json(result.rows);
            console.log("comments result: ",result.rows[0]); ////this works!
        })
        .catch(function(err) {
            console.log("err in GET /comments :", err.message);
        });
});
///////////////////////////  upcomments /////////////

app.post('/upcomments/:id', (req, res) => {
    db.upcomments(req.body.comment, req.body.username,req.body.image_id)
        .then(result => {
            res.json(result.rows);
            console.log("upcomments/:id, result.rows", result.rows);
        });
});

app.get("/image", (req, res) => {
    return db
        .getImages()
        .then(result => {
            res.json(result);
        })
        .catch(function(err) {
            console.log("err in GET /images :", err.message);
        });

});
app.listen(8080, () => console.log(`Glistening!`));
