// errorHandler.js
// Global error handling middleware for the application

const errorHandler = (err, req, res, next) => {
  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Log the error for server-side debugging (not visible to client)
  console.error(`Error: ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const validationErrors = {};
    
    // Mongoose validation error handling
    if (err.errors) {
      Object.keys(err.errors).forEach(key => {
        validationErrors[key] = err.errors[key].message;
      });
      message = 'Validation failed';
    }
    
    return res.status(statusCode).json({
      success: false,
      message,
      errors: validationErrors
    });
  }
  
  // Handle JWT authentication errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Invalid or expired token';
  }
  
  // Handle duplicate key errors (MongoDB)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate data found';
    
    // Get the key that caused the duplicate error
    const field = Object.keys(err.keyPattern)[0];
    if (field) {
      message = `${field} already exists`;
    }
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler;
