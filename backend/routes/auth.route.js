import express from 'express'
import { getMe, login, logout ,signup} from '../controller/auth.controller.js'
import {protectRoute} from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/me" ,protectRoute, getMe )

// signup route
router.post('/signup', signup );

// Login route
router.post('/login', login );

// // Logout route
router.post('/logout', logout);

export default router