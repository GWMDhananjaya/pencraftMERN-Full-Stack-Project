// Importing the necessary modules and functions
import express from 'express';
import { signout, test, updateUser } from '../controllers/user.controller.js'; // Importing controller functions for user routes
import { verifyToken } from '../utils/verifyUser.js'; // Importing function to verify user token

// Creating a router instance from Express
const router = express.Router();

// Route for testing purposes
router.get('/test', test);

// Route for updating user information, requires token verification
router.put('/update/:userId', verifyToken, updateUser);

// Route for user signout
router.post('/signout', signout);

// Exporting the router instance to be used by other parts of the application
export default router;
