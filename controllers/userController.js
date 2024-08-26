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
    const { name, email } = req.body;
    if (!name) {
        return res.status(400).send('User Name is required');
    }
    if (!email) {
        return res.status(400).send('Email is required');
    }
    try {
        const newUser = await userModel.createUser(name, email);
        res.json(newUser.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    const { id, name, email } = req.body;

    if (!id) {
        return res.status(400).send('User ID is required');
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email ? re.test(email) : true;
    };

    if (email && !validateEmail(email)) {
        return res.status(400).send('Invalid email format');
    }

    try {
        const updatedUser = await userModel.updateUser(id, name, email);

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
};
