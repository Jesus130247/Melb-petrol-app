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

module.exports = router