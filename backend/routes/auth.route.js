import express from 'express'
import { login, logout ,signup} from '../controller/auth.controller.js'

const router = express.Router();

// Register route
router.post('/signup', signup );

// Login route
router.post('/login', login );

// // Logout route
router.post('/logout', logout);

export default router