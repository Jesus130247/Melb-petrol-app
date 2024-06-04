const db = require('../db')

function findAllStations() {
    let sql = `
    SELECT * FROM stations
    JOIN owners
    ON stations.owner_id = owners.id
    JOIN locations
    ON stations.location_id = locations.id
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