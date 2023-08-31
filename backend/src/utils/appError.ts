class AppError extends Error {
    statusCode: number;
    status: string;
    code: string;

    constructor(message: string, statusCode: number) {
        super(message);

        // Set the status code and determine status based on the statusCode
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // Set the prototype and capture the stack trace
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
