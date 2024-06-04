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

<<<<<<< HEAD
function findRandomStation() {
    let sql = `
    SELECT * FROM stations
=======
function findStats() {
    let sql = `
    SELECT owners.brand_name, count(*) FROM stations
>>>>>>> feaad8f (stats info 2/2)
    JOIN owners
    ON stations.owner_id = owners.id
    JOIN locations
    ON stations.location_id = locations.id
<<<<<<< HEAD
    ORDER BY RANDOM()
    LIMIT 1;
    `
    return db.query(sql)
        .then(result => result.rows[0])
}

const Station = {
    findAllStations,
    findAllLocations,
    findRandomStation
=======
    GROUP BY owners.id
    ORDER BY count(*) DESC;
    `
    return db.query(sql)
        .then(result => result.rows)
>>>>>>> feaad8f (stats info 2/2)
}

function findCountStations() {
    let sql = `
    SELECT count(*) FROM stations;
    `
    return db.query(sql)
        .then(result => result.rows[0])
}
const Station = {
    findAllStations,
    findAllLocations,
    findStats,
    findCountStations
}

module.exports = Station

