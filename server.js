require('dotenv').config()

const express = require('express')
const app = express()
const port = 6660

app.use(express.static('client'))

app.use(express.json())

app.get('/test', (req, res) => {
    res.send('Melbourne Petrol App')
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})  