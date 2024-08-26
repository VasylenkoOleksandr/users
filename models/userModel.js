const db = require('../db');
const res = require("express/lib/response");

exports.getAllUsers = () => {
    return db.query('SELECT * FROM users');
};

exports.createUser = (name, email) => {
    return db.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
};
exports.updateUser = async (id, name, email) => {
    try {
        const fields = [];
        const values = [];
        let index = 1;

        if (name) {
            fields.push(`name = $${index++}`);
            values.push(name);
        }
        if (email) {
            fields.push(`email = $${index++}`);
            values.push(email);
        }

        if (fields.length === 0) {
            throw new Error('No fields to update');
        }

        values.push(id);

        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
