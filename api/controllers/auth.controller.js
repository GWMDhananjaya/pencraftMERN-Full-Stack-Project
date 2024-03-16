// Importing User model and necessary dependencies
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

// Function to handle user signup
export const signup = async (req, res ,next) => {
    // Destructuring username, email, and password from request body
    const { username, email, password } = req.body;

    // Checking if any of the required fields are missing or empty
    if (!username || !email || !password || username === '' || email === '' || password === '') {
       // If any field is missing or empty, calling errorHandler with 400 status and error message
       next(errorHandler(400, 'All fields are required!')); 
    }

    // Hashing the password using bcryptjs
    const hashedPassword = bcryptjs.hashSync(password, 10);
  
    // Creating a new User instance with hashed password
    const newUser = new User({
      username,
      email,
      password : hashedPassword,
    });

    try {
      // Saving the new user to the database
      await newUser.save();
      // Sending success message if signup is successful
      res.json('Signup successful!'); 
    } catch (error) {
      // Forwarding any error to the error handling middleware
      next(error);
    }
};

// Function to handle user signin
export const signin = async (req, res, next) => {
    // Destructuring email and password from request body
    const { email, password } = req.body;

    // Checking if email or password is missing or empty
    if (!email || !password || email === '' || password === '') {
      // If any field is missing or empty, calling errorHandler with 400 status and error message
      next(errorHandler(400, 'All fields are required'));
    }
    try {
        // Finding user by email in the database
        const validUser = await User.findOne({ email });
        if (!validUser) {
          // If user not found, calling errorHandler with 404 status and error message
          return next(errorHandler(404, 'User not found'));
        }
        // Comparing entered password with hashed password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
          // If password is invalid, calling errorHandler with 400 status and error message
          return next(errorHandler(400, 'Invalid password'));
        }
        // Generating JWT token
        const token = jwt.sign(
          { id: validUser._id, isAdmin: validUser.isAdmin },
          process.env.JWT_SECRET,
        );
    
        // Removing password from user object
        const { password: pass, ...rest } = validUser._doc;
    
        // Setting token in cookie and sending user data in response
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } catch (error) {
        // Forwarding any error to the error handling middleware
        next(error);
      }
};

// Function to handle Google OAuth signin/signup
export const google = async (req, res, next) => {
  // Destructuring email, name, and googlePhotoUrl from request body
  const { email, name, googlePhotoUrl } = req.body;
  try {
    // Checking if user exists in the database
    const user = await User.findOne({ email });
    if (user) {
      // If user exists, generating JWT token and sending user data in response
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      // If user does not exist, generating a random password, hashing it, and creating a new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        // Generating a username based on name and random characters
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      // Saving the new user to the database
      await newUser.save();
      // Generating JWT token for the new user and sending user data in response
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    // Forwarding any error to the error handling middleware
    next(error);
  }
};
