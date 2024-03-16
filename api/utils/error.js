// Define a function named errorHandler that takes in two parameters: statusCode and message
export const errorHandler = (statusCode, message) => {
  // Create a new Error object
  const error = new Error();
  // Set the statusCode property of the error object to the provided statusCode parameter
  error.statusCode = statusCode;
  // Set the message property of the error object to the provided message parameter
  error.message = message;
  // Return the error object
  return error;
};
