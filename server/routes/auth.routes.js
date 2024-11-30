import express from 'express';
import { login, createAdminUser, logout } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/login', login);

router.post('/createAdminUser', createAdminUser);


router.post('/logout', logout);

export default router;