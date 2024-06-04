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
<<<<<<< HEAD
let brandNamesList = []

async function doDatabase() {
    let sql1 = "delete from stations"
    let sql2 = "delete from locations"
    let sql3 = "delete from owners"
    let deleted = await db.query(sql1).then(() => db.query(sql2)).then(() => db.query(sql3))
    let owners = await doOwners()
    let locations = await doLocations()
    let stations = await doStations()
} 
async function doOwners() {
    for (let line of lines.slice(1)) {
        let sections = line.split(',')
        let brandName = sections[7]
        let sql
        let sqlNewOwner = `
=======
let brandNames = []
for (let line of lines.slice(1,400)) {
    let sections = line.split(',')
    let brandName = sections[7]
    if (!brandNames.includes(brandName)) {
        brandNames.push(brandName)
        let sqlOwner = `
>>>>>>> dee7444 (intentional error)
        INSERT INTO owners
        (brand_name)
        VALUES ($1)
        RETURNING *;
        `
        let sqlExistingOwner = `
        SELECT * FROM owners
        WHERE brand_name = $1;
        `
        if (!brandNamesList.includes(brandName)) {
            brandNamesList.push(brandName)
            sql = sqlNewOwner
        } else {
            sql = sqlExistingOwner
        }
        db.query(sql, [brandName])
        .catch(err=>console.log(err))
    }
}
async function doLocations() {
    for (let line of lines.slice(1)) {
        let stationObj = {}
<<<<<<< HEAD
        let sections = line.split(',')
        stationObj.address = sections[9]
        stationObj.suburb = sections[10]
        stationObj.lat = sections[sections.length - 2]
        stationObj.lng = sections[sections.length - 1]
        let sqlLocation = `
            INSERT INTO locations
            (address, suburb, lat, lng)
            VALUES
            ($1, $2, $3, $4);
        `
        db.query(sqlLocation, [stationObj.address, stationObj.suburb, stationObj.lat, stationObj.lng])
        .catch(err=>console.log(err))
=======
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
>>>>>>> dee7444 (intentional error)
    }
}
async function doStations() {
    for (let line of lines.slice(1)) {
        let stationObj = {}
        let sections = line.split(',')
        let brandName = sections[7]
        let address = sections[9]
        stationObj.description = sections[2]
        stationObj.name = sections[5]
        let sql_ownersId = `SELECT id FROM owners WHERE brand_name = $1`
        let sql_locationId = `SELECT id FROM locations WHERE address = $1`
        let ownerId = await db.query(sql_ownersId, [brandName]).then(res=>res.rows[0])
        let locationId = await db.query(sql_locationId, [address]).then(res=>res.rows[0])
        let sqlStation = `
        INSERT INTO stations
        (owner_id, location_id, station_name, description)
        VALUES
        ($1, $2, $3, $4)
        `
        db.query(sqlStation, [ownerId.id, locationId.id, stationObj.name, stationObj.description])
        .catch(err=>console.log(err))
    }
}
doDatabase()