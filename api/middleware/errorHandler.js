function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.log("----------------------------------------------------");
  console.error(
    `[ERROR] ${err.name}: ${err.message} (Status: ${err.statusCode || 500})`
  );
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}

class CustomError extends Error {
  statusCode;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

function customError(message, statusCode) {
  return new CustomError(message, statusCode);
}

module.exports = { errorHandler, customError };
