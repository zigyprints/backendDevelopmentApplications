export abstract class CustomError extends Error{
    abstract statusCode:number;
  
    constructor(message:string)
    {
     super(message);
    }
  
  
    // a function which always returns an array of objects which contains msg and optional fields property 
    abstract formattedErrorMessage():{
      message:string,
      fields?:string
    }[]
  }