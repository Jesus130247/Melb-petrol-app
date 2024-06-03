const pg = require('pg')

const connectionString = process.env.DATABASE_URL

const pool = new pg.Pool({
    connectionString: connectionString
})

module.exports = pool
