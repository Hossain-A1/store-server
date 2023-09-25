import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authControllerInstance = new AuthController();

const authRouter: Router = express.Router();
// register
authRouter.post('/register', authControllerInstance.register);
//login
authRouter.post('/login', authControllerInstance.login);

export default authRouter;
