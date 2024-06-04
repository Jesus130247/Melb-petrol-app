const db = require('../db')

function findAllOwners() {
    let sql = ` SELECT * FROM owners `
    
    return db.query(sql)
        .then(result => result.rows)
}

const Owner = {
    findAllOwners
}

module.exports = Owner