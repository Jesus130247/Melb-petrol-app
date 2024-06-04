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
=======
// let brandNamesList = []
async function doSomething() {
>>>>>>> 2c069e7 (failed code for seed)
    let sql1 = "delete from stations"
    let sql2 = "delete from locations"
    let sql3 = "delete from owners"
    let deleted = await db.query(sql1).then(() => db.query(sql2)).then(() => db.query(sql3))
<<<<<<< HEAD
    let owners = await doOwners()
    let locations = await doLocations()
    let stations = await doStations()
} 
async function doOwners() {
    for (let line of lines.slice(1)) {
        let sections = line.split(',')
        let brandName = sections[7]
        let sql
=======
    for (let line of lines.slice(1,400)) {
        let sections = line.split(',')
        let brandName = sections[7]
>>>>>>> 2c069e7 (failed code for seed)
        let sqlNewOwner = `
        INSERT INTO owners
        (brand_name)
        VALUES ($1)
        RETURNING *;
        `
<<<<<<< HEAD
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
=======
        db.query(sqlNewOwner,[brandName])
            .then(res => console.log(res.rows[0]))
    }

    for (let line of lines.slice(1)) {
        let sections = line.split(',')
        let brandName = sections[7]
        let sql
        // let sqlNewOwner = `
        // INSERT INTO owners
        // (brand_name)
        // VALUES ($1)
        // RETURNING *;
        // `
        
        let sqlExistingOwner = `
        SELECT * FROM owners
        WHERE brand_name = ($1);
        `
        // if (!brandNamesList.includes(brandName)) {
        //     brandNamesList.push(brandName)
        //     sql = sqlNewOwner
        // } else {
        //     sql = sqlExistingOwner
        // }
        let stationObj = {}
        stationObj.description = sections[2]
        stationObj.name = sections[5]
        stationObj.address = sections[9]
        stationObj.suburb = sections[10]
        stationObj.lat = sections[15]
        stationObj.lng = sections[16]
        db.query(sqlExistingOwner, [brandName])
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
        .catch(err => console.log(err))


    }


    

}

doSomething()
>>>>>>> 2c069e7 (failed code for seed)
