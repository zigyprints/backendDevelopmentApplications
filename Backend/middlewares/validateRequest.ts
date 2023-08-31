import { Request, Response, NextFunction } from 'express';
import { validationResult,FieldValidationError} from 'express-validator';
import { CustomError } from './customError';
class RequestValidationError extends CustomError {
    statusCode=400;
    constructor(public errors: any) {
      //just for logging purposes
      super('Invalid Request');
      // Only because we are extending a built in class
    }
  
    formattedErrorMessage(){
      return this.errors.map((err:FieldValidationError) => {
        return {
          message:err.msg,
          field:err.path
         };
     });
    }
  }

// a middleware to handle validation errors created by express-validator
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};