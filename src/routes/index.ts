import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);

export default router;

