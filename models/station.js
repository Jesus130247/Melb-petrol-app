const db = require('../db')

function findAllStations() {
    let sql = ` SELECT * FROM stations 
    LIMIT 400;
    `
    return db.query(sql)
        .then(result => result.rows)
}

function findAllLocations() {
    let sql = ` SELECT * FROM locations
    LIMIT 400;
    `

    return db.query(sql)
        .then(result => result.rows)
}

const Station = {
    findAllStations,
    findAllLocations
}

module.exports = Station