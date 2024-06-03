require('dotenv').config()
// Node.js program to demonstrate the
// fs.readFileSync() method
// Include fs module
const fs = require('fs');
const db = require('./index')
// Calling the readFileSync() method
// to read 'input.txt' file
const data = fs.readFileSync('./db/stations.csv',
    { encoding: 'utf8', flag: 'r' });
// Display the file data
// console.log(data);
let lines = data.split('\n')
for (let line of lines.slice(1,3)) {
    let sections = line.split(',')
    let brandName = sections[7]
    let sql = `
    INSERT INTO owners
    (brand_name)
    VALUES ($1)
    RETURNING *;
    `
    let stationObj = {}
    stationObj.description = sections[2]
    stationObj.name = sections[5]
    stationObj.address = sections[9]
    stationObj.suburb = sections[10]
    stationObj.lat = sections[15]
    stationObj.lng = sections[16]
    console.log(stationObj);

    db.query(sql, [brandName])
        .then(res => {
            stationObj.owner_id = res.rows[0].id
            let sqlLocation = `
            INSERT INTO locations
            (address, suburb, lat, lng)
            VALUES
            ($1, $2, $3, $4)
            RETURNING *;
            `
            return db.query(sqlLocation, [stationObj.address, stationObj.suburb, stationObj.lat, stationObj.lng])
                .then(res => {
                    stationObj.location_id = res.rows[0].id
                    let sqlStation = `
                    INSERT INTO stations
                    (owner_id, location_id, station_name, description)
                    `
                })
        })
}


for (let line of lines.slice(1,3)) {
    let stationObj = {}
    let sections = line.split(',')
    // console.log(sections);
    stationObj.description = sections[2]
    stationObj.name = sections[5]
    stationObj.address = sections[9]
    stationObj.suburb = sections[10]
    stationObj.lat = sections[15]
    stationObj.lng = sections[16]
    console.log(stationObj);
}