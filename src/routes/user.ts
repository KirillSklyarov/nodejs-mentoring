import express, { json } from "express";
import { getUserById } from '../controllers/user/getUserById';
import { createUserValidator } from '../middlewares/createUserValidator';
import { createUser } from '../controllers/user/createUser';
import { updateUser } from '../controllers/user/updateUser';
import { updateUserValidator } from '../middlewares/updateUserValidator';
import { uuidValidator } from '../middlewares/uuidValidator';

export const userRouter = express.Router();

userRouter.get('/:id', uuidValidator, getUserById);
userRouter.post('', json(), createUserValidator, createUser);
userRouter.patch('/:id', json(), uuidValidator, updateUserValidator, updateUser);
