const express = require('express')
const router = express.Router()
const Station = require('../models/station')

router.get('/api/stations', (req, res) => {
    Station.findAll()
        .then(stations => res.status(200).json(stations))
})

module.exports = router