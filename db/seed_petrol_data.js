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
let brandNamesList = []
for (let line of lines.slice(1,2)) {
    let sections = line.split(',')
    let brandName = sections[7]
    let sql
    let sqlNewOwner = `
    INSERT INTO owners
    (brand_name)
    VALUES ($1)
    RETURNING *;
    `
    
    let sqlExistingOwner = `
    SELECT * FROM owners
    WHERE brand_name = ($1);
    `
    if (!brandNamesList.includes(brandName)) {
        brandNamesList.push(brandName)
        sql = sqlNewOwner
    } else {
        sql = sqlExistingOwner
    }
    let stationObj = {}
    stationObj.description = sections[2]
    stationObj.name = sections[5]
    stationObj.address = sections[9]
    stationObj.suburb = sections[10]
    stationObj.lat = sections[15]
    stationObj.lng = sections[16]
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
    })
    .then(res => {
        stationObj.location_id = res.rows[0].id
        let sqlStation = `
        INSERT INTO stations
        (owner_id, location_id, station_name, description)
        VALUES
        ($1, $2, $3, $4)
        `
        return db.query(sqlStation, [stationObj.owner_id, stationObj.location_id, stationObj.name, stationObj.description])
    })
    .then(() => db.end())


}

// async function getBrandId(brandName) {
//     sql = `SELECT * FROM owners WHERE brand_name = $1;`
//     let res =  await db.query(sql, [brandName])
//     let id = await res.rows[0].id
//     return id
// }