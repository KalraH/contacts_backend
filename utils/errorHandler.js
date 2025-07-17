/**
 * @file utils/errorHandler.ts
 * @description Custom error handler for API responses.
 * 
 * @param {string} message - Error message.
 * @param {number} statusCode - HTTP status code.
 * @param {Array} errors - Array of error details.
 * @param {string} stack - Stack trace of the error.
 */
class ErrorHandler extends Error {
	constructor(
		statusCode, 
		message = "Something Went Wrong !!", 
		errors = [], 
		stack = ""
	) {
		super(message);

		this.data = null;
		this.stack = stack;
		this.success = false;
		this.message = message;
		this.errors = errors;
		this.statusCode = statusCode;

		if (stack && stack.length > 0) {
			this.stack = stack;
		}
		else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export {ErrorHandler};