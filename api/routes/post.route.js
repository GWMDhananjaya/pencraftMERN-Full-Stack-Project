// Importing the Express framework to handle HTTP requests
import express from 'express';

// Importing the verifyToken function from the 'verifyUser.js' file in the 'utils' directory
import { verifyToken } from '../utils/verifyUser.js';

// Importing the create, getposts, and deletepost functions from the 'post.controller.js' file in the 'controllers' directory
import {create,  getposts, deletepost} from '../controllers/post.controller.js';

// Creating an instance of Express Router
const router = express.Router();

// Endpoint for creating a new post. It requires token verification using the verifyToken middleware.
router.post('/create', verifyToken, create)

// Endpoint for fetching all posts
router.get('/getposts', getposts)

// Endpoint for deleting a post. It requires token verification using the verifyToken middleware.
// The postId and userId are provided as route parameters.
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)

// Exporting the router to be used by other parts of the application
export default router;
