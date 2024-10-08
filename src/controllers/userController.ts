import { Request, Response } from 'express';
import * as userModel from '../models/userModel';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('test')
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!name && typeof name !== 'string') {
            res.status(422).send('"Name" is a mandatory field and must be a string');
            return;
        }
        const validateEmail = (email?: string): boolean => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return email ? re.test(email) : true;
        };
        if (!email && typeof email !== 'string' && !validateEmail(email)) {
            res.status(422).send('"Email" is a mandatory field and must be a string');
            return;
        }

        if (!password) {
            res.status(422).send('"Password" is a mandatory field');
            return;
        }
        const newUser = await userModel.createUser(name, email, password);

        console.log('Created user:', newUser);

        res.json(newUser);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error creating user:', error.message);
            res.status(500).send(error.message);
        } else {
            console.error('Unknown error creating user:', error);
            res.status(500).send('An unknown error occurred');
        }
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id, name, email } = req.body;

    if (!id) {
        res.status(400).send('User ID is required');
    }

    const validateEmail = (email?: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email ? re.test(email) : true;
    };

    if (email && !validateEmail(email)) {
        res.status(400).send('Invalid email format');
    }

    try {
        const updatedUser = await userModel.updateUser(id, name, email);

        if (!updatedUser) {
            res.status(404).send('User not found');
        }
        res.json(updatedUser);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error updating user:', error);
            res.status(500).send(error.message);
        } else {
            console.error('Unknown error occurred:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};