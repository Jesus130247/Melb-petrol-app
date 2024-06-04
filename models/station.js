const db = require('../db')

function findAll() {
    let sql = ` SELECT * FROM stations 
    JOIN owners 
    ON stations.owner_id = owners.id 
    JOIN locations 
    ON stations.location_id = locations.id
    ORDER BY stations.id
    LIMIT 400;
    `
    return db.query(sql)
        .then(result => result.rows)
}

const Station = {
    findAll
}

module.exports = Station