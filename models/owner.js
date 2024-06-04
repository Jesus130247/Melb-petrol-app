const db = require('../db')

function findAll() {
    let sql = ` SELECT * FROM owners `
    
    return db.query(sql)
        .then(result => result.rows)
}

const Owner = {
    findAll
}

module.exports = Owner