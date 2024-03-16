// Importing necessary modules
import express from 'express'; // Importing Express framework
import mongoose from 'mongoose'; // Importing mongoose for MongoDB connectivity
import dotenv from 'dotenv'; // Importing dotenv for environment variables
import authRoutes from './routes/auth.route.js'; // Importing routes for authentication
import userRoutes from './routes/user.route.js'; // Importing routes for user operations
import cookieParser from 'cookie-parser'; // Importing cookie-parser for handling cookies
import postRoutes from './routes/post.route.js'; // Importing routes for post operations

dotenv.config(); // Configuring dotenv to use environment variables

// Connecting to MongoDB using the provided connection string in the environment variable
mongoose.connect(process.env.MONGO).then(() => {
  console.log('MongoDb is connected'); // Logging successful connection to MongoDB
}).catch((err) => {
  console.log(err); // Logging any errors that occur during MongoDB connection
});

const app = express(); // Creating an Express application instance

app.use(express.json()); // Parsing incoming JSON requests
app.use(cookieParser()); // Using cookie-parser middleware to parse cookies

// Starting the server on port 3000 and logging a message when the server starts
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

// Mounting user routes to '/api/user' endpoint
app.use('/api/user', userRoutes); 

// Mounting authentication routes to '/api/auth' endpoint
app.use('/api/auth', authRoutes);

// Mounting post routes to '/api/post' endpoint
app.use('/api/post', postRoutes);

// Error handling middleware to catch and handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Setting status code of the response
  const message = err.message || 'Internal Server Error'; // Setting error message
  res.status(statusCode).json({ // Sending JSON response with status code and error message
    success: false,
    statusCode,
    message,
  });
});
