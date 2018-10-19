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


exports.getImages = function() {
    return db.query(`SELECT * FROM images`).then(result => {
        return result.rows;
    });
};



////////////////
exports.upload = function(url, username, title, description) {
    const q = `
    INSERT INTO images (url, username, title, description)
    VALUES ($1, $2, $3, $4) returning *
        `;

    const params = [url, username, title, description];
    return db.query(q, params);
};

exports.upcomments = function(comment, username, image_id) {
    console.log("db query",comment, username, image_id);
    const q = `
    INSERT INTO comments (comment, username, image_id)
    VALUES ($1, $2, $3) returning *
        `;

    const params = [comment || null, username || null, image_id || null];
    return db.query(q, params);
};


exports.zoom = function(id) {
    const q = `
    SELECT * FROM images WHERE id = $1;
        `;
    [id]

    ;

    const params = [id];
    return db.query(q, params);
};

exports.comments = function(image_id) {
    const q = `
    SELECT * FROM comments WHERE id = $1;
        `;
    [image_id]

    ;

    const params = [image_id];
    return db.query(q, params);
};
