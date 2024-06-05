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

router.get('/api/stations/random', (req, res) => {
    Station.findRandomStation()
        .then(randomStation => res.status(200).json(randomStation))
})

router.get('/api/stats', (req,res) => {
    let statsObj = {}
    let p0 = Station.findStats()
        let p1 = Owner.findCountOwners()
        let p2 = Station.findCountStations()
    Promise.all([p0,p1,p2])
        .then(([stats, ownerCount, stationCount]) => {
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

router.get('/api/stations/bounds/:topLeft_0/:topLeft_1/:bottomRight_0/:bottomRight_1', (req, res) => {
    let topLeft = [ req.params.topLeft_0, req.params.topLeft_1]
    let bottomRight = [ req.params.bottomRight_0, req.params.bottomRight_1]
    Station.findBoundStationList(topLeft, bottomRight)
        .then(stationList => res.status(200).json(stationList))
        .catch(err => res.status(400).json(err))
})

module.exports = router 


