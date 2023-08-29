const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode ? res.statusCode: 500;
    switch (statusCode) {
        case BAD_REQUEST:
            res.json({
                title: "BAD_REQUEST",
                message: err.message,
                stack: err.stack,
                message: err.message
            });
            break;
        case UNAUTHORIZED:
            res.json({
                title: "UNAUTHORIZED_ACCES)",
                message: err.message,
                stack: err.stack,
                message: err.message
            });
            break;
        case FORBIDDEN:
            res.json({
                title: "FORBIDDEN",
                message: err.message,
                stack: err.stack,
                message: err.message
            })
            break;
        case NOT_FOUND:
            res.json({
                title: "NOT_FOUND",
                message: err.message,
                stack: err.stack,
                message: err.message
            })
            break;
        case INTERNAL_SERVER_ERROR:
            res.json({
                title: "INTENAL_SERVER_ERROR",
                message: err.message,
                stack: err.stack,
                message: err.message
            })
            break;
    
        default:
            res.json({
                title: "UNKNOWN_ERROR",
                message: "Unkown Error Occur",
                stack: err.stack,
                message: err.message
            });
            break;
    }

}

module.exports = errorHandler;