"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getAllUsers = void 0;
const db_1 = require("../db");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)('SELECT * FROM users');
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
});
exports.createUser = createUser;
const updateUser = (id, name, email) => __awaiter(void 0, void 0, void 0, function* () {
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
        const queryStr = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
        const result = yield (0, db_1.query)(queryStr, values);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0];
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
});
exports.updateUser = updateUser;
