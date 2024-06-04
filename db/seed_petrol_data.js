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
let brandNames = []
for (let line of lines.slice(1,400)) {
    let sections = line.split(',')
    let brandName = sections[7]
    if (!brandNames.includes(brandName)) {
        brandNames.push(brandName)
        let sqlOwner = `
        INSERT INTO owners
        (brand_name)
        VALUES ($1)
        RETURNING *;
        `
        let stationObj = {}
        stationObj.owner_id = sections[0] //changed owner_id here -------------------------------
        stationObj.description = sections[2]
        stationObj.name = sections[5]
        stationObj.address = sections[9]
        stationObj.suburb = sections[10]
        stationObj.lat = sections[15]
        stationObj.lng = sections[16]
        console.log(stationObj);
        db.query(sqlOwner, [brandName])
        .then(res => {
            let sqlLocation = `
            INSERT INTO locations
            (address, suburb, lat, lng)
            VALUES
            ($1, $2, $3, $4)
            RETURNING *;
            `
            return db.query(sqlLocation, [stationObj.address, stationObj.suburb, stationObj.lat, stationObj.lng])
        }) //-----------------------------------------------ERROR---------------------OWNER UNDEFINED---------------------------------
        .then(res => { //how is owner_id being defined up to or after this point?
            stationObj.location_id = res.rows[0].id // .id --> .owner_id?
            // stationObj.owner_id = res.rows[owner.id]
            let sqlStation = `
            INSERT INTO stations
            (owner_id, location_id, station_name, description)
            VALUES
            ($1, $2, $3, $4)
            `
            return db.query(sqlStation, [stationObj.owner_id, stationObj.location_id, stationObj.name, stationObj.description])
        })//--------------------------------------------------------------------------------------------------------------------------
        .then(() => db.end())
    } else {
        let brandId = getBrandId(brandName)
        console.log('id', brandId)
    }

}

async function getBrandId(brandName) {
    sql = `SELECT * FROM owners WHERE brand_name = $1;`
    let res =  await db.query(sql, [brandName])
    let id = await res.rows[0].id
    return id
}