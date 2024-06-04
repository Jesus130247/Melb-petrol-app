const express = require('express')
const router = express.Router()
const Station = require('../models/station')
const Owner = require('../models/owner')

router.get('/api/stations', (req, res) => {
    Station.findAll()
        .then(stations => res.status(200).json(stations))
})

router.get('/api/owners', (req,res) => {
    Owner.findAll()
        .then(owners => res.status(200).json(owners))
})

module.exports = router