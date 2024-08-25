const db = require('../db');

exports.getAllUsers = () => {
    return db.query('SELECT * FROM users');
};

exports.createUser = (name, email) => {
    return db.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
};
