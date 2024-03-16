// Importing the Post model and the errorHandler utility function
import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

// Controller function to create a new post
export const create = async (req, res, next) => {
  // Checking if the required fields are provided in the request body
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  // Generating a slug from the title
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  // Creating a new post instance with data from the request body
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    // Saving the new post to the database
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Responding with the saved post data
  } catch (error) {
    next(error); // Forwarding any errors to the error handling middleware
  }
};

// Controller function to fetch posts based on various query parameters
export const getposts = async (req, res, next) => {
  try {
    // Parsing query parameters for pagination and sorting
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    // Constructing the query based on available query parameters
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection }) // Sorting by updatedAt field
      .skip(startIndex) // Pagination: Skip records based on start index
      .limit(limit); // Pagination: Limit the number of records returned

    // Counting total number of posts in the database
    const totalPosts = await Post.countDocuments();

    // Counting number of posts created in the last month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // Responding with fetched posts data, total count, and count from last month
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error); // Forwarding any errors to the error handling middleware
  }
};

// Controller function to delete a post by its ID
export const deletepost = async (req, res, next) => {
  try {
    // Finding and deleting the post by its ID
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted'); // Responding with success message
  } catch (error) {
    next(error); // Forwarding any errors to the error handling middleware
  }
};
