const express = require('express')
const router = express.Router()
const Station = require('../models/station')
const Owner = require('../models/owner')

router.get('/api/stations', (req, res) => {
    Station.findAllStations()
        .then(stations => res.status(200).json(stations))
})

router.get('/api/stations/locations', (req, res) => {
    Station.findAllLocations()
        .then(locations => res.status(200).json(locations))
})

router.get('/api/owners', (req,res) => {
    Owner.findAllOwners()
        .then(owners => res.status(200).json(owners))
})

<<<<<<< HEAD
router.get('/api/stations/random', (req, res) => {
    Station.findRandomStation()
        .then(randomStation => res.status(200).json(randomStation))
})

module.exports = router 
=======
router.get('/api/stats', (req,res) => {
    let statsObj = {}
    let p0 = Station.findStats()
    // .then(stats => {
    //     let newStats = []
    //     for (let stat of stats) {
    //             if (Number(stat.count) > 1) {
    //                 newStats.push(stat)
    //             }
    //         }
        // statsObj.owners = newStats
        let p1 = Owner.findCountOwners()
            // .then(count => {
            //     statsObj.total_owners = count

            // })
        let p2 = Station.findCountStations()
        // .then(count => {
        //     statsObj.total_stations = count

        // })
    Promise.all([p0,p1,p2])
        .then(([stats, ownerCount, stationCount]) => {
            // console.log(stats);
            // console.log(ownerCount);
            // console.log(stationCount);
            let filteredStats = []
            for (let stat of stats) {
                    if (Number(stat.count) > 1) {
                        filteredStats.push(stat)
                    }
                }
            statsObj.owners = filteredStats
            statsObj.total_owners = ownerCount.count
            statsObj.total_stations = stationCount.count

            return statsObj
        })
        .then(statsObj => res.status(200).json(statsObj))
})
module.exports = router
>>>>>>> feaad8f (stats info 2/2)
