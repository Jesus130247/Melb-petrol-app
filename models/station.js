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

function findRandomStation() {
    let sql = `
    SELECT * FROM stations
    JOIN owners
    ON stations.owner_id = owners.id
    JOIN locations
    ON stations.location_id = locations.id
    ORDER BY RANDOM()
    LIMIT 1;
    `
    return db.query(sql)
        .then(result => result.rows[0])
}

function findStats() {
    let sql = `
    SELECT owners.brand_name, count(*) FROM stations
    JOIN owners
    ON stations.owner_id = owners.id
    JOIN locations
    ON stations.location_id = locations.id
    GROUP BY owners.id
    ORDER BY count(*) DESC;
    `
    return db.query(sql)
        .then(result => result.rows)
}

function findCountStations() {
    let sql = `
    SELECT count(*) FROM stations;
    `
    return db.query(sql)
    .then(result => result.rows[0])
}

function findBoundStationList(topLeft, bottomRight) {
    let [ topLat, topLng ] = topLeft
    let [ bottomLat, bottomLng ] = bottomRight
    let sql = `
    SELECT * FROM stations
    JOIN owners
    ON stations.owner_id = owners.id
    JOIN locations
    ON stations.location_id = locations.id
    WHERE lat BETWEEN $1 AND $2
    AND lng BETWEEN $3 AND $4;
    `
    return db.query(sql, [bottomLat, topLat, topLng, bottomLng])
        .then(result => result.rows)
}

function findStationsAroundPosition(position, radius=0.1) {
    console.log('positon',position)
    console.log(radius)
    let start = [Number(position.lat)-radius, Number(position.lng)-radius]
    let end = [Number(position.lat)+radius, Number(position.lng)+radius]
    console.log('startend',start,end)
    let sql = `
    SELECT * FROM stations
    JOIN owners
    ON stations.owner_id = owners.id
    JOIN locations
    ON stations.location_id = locations.id
    WHERE lat BETWEEN $1 AND $2
    AND lng BETWEEN $3 AND $4
    LIMIT 700;
    `
    return db.query(sql, [start[0], end[0], start[1], end[1]])
        .then(result => result.rows)
}

const Station = {
    findAllStations,
    findAllLocations,
    findStats,
    findCountStations,
    findRandomStation,
    findStationsAroundPosition,
    findBoundStationList
}

module.exports = Station

