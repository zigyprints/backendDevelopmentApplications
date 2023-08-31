

export  class CustomError extends Error{                      //error class
    statusCode:number;
    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    }
}

export const createCustomError = (msg:string, statusCode:number) => {
    return new CustomError(msg, statusCode);
}