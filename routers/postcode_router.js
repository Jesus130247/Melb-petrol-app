const express = require('express')
const router = express.Router()

router.get('/api/postcode/:postcode', (req, res) => {
    fetch(`http://v0.postcodeapi.com.au/suburbs/${req.params.postcode}.json`)
    .then(res => res.json())
    .then(data => res.status(200).json(data))
})


module.exports = router 