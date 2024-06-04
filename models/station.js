const db = require('../db')

function findAll() {
    let sql = ` SELECT * FROM stations 
    LIMIT 400;
    `
    return db.query(sql)
        .then(result => result.rows)
}

const Station = {
    findAll
}

module.exports = Station