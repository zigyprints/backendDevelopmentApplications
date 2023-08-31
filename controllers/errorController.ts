import { Request, Response,NextFunction } from "express";


module.exports = (err:AppError,req:Request,res:Response,next:NextFunction) => {

    if(err.isOperational){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    
    // 1) Log the error
    console.error('Error 💥',err);
    
    // 2) send generic error
    res.status(500).json({
        status: 'error',
        message: 'something went wrong!'
    });
}