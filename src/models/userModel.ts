import { query } from '../db';
import { QueryResult } from 'pg';

interface User {
    id?: number;
    name?: string;
    email?: string;
}

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const result: QueryResult<User> = await query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (name: string, email: string): Promise<User> => {
    try {
        const result: QueryResult<User> = await query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (id: number, name?: string, email?: string): Promise<User> => {
    try {
        const fields: string[] = [];
        const values: (string | number)[] = [];
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

        const queryStr = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
        const result: QueryResult<User> = await query(queryStr, values);

        if (result.rows.length === 0) {
            throw new Error('User not found');
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
