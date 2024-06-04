const db = require('../db')

function findAllOwners() {
    let sql = ` SELECT * FROM owners `
    
    return db.query(sql)
        .then(result => result.rows)
}

function findCountOwners() {
    let sql = `
    SELECT count(*) FROM owners;
    `
    return db.query(sql)
        .then(result => result.rows[0])
}

const Owner = {
    findAllOwners,
    findCountOwners
}

module.exports = Owner