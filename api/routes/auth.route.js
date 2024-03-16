// Importing Express framework for creating routes
import express from "express";

// Importing controller functions for authentication
import { signin, signup, google } from "../controllers/auth.controller.js";

// Creating an Express router instance
const router = express.Router();

// Defining routes for signup, signin, and google authentication
router.post('/signup', signup); // Route for user signup
router.post('/signin', signin); // Route for user signin
router.post('/google', google); // Route for Google authentication

// Exporting the router instance to be used by the application
export default router;
