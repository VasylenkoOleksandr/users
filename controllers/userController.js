const userModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await userModel.createUser(name, email);
        res.json(newUser.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
