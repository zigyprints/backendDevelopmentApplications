const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const app = express();

import { NextFunction, Request, Response } from 'express';

const taskRouter= require('./routes/taskRouter.ts');
const AppError = require('./utils/appError');
const globalErrorHandler= require('./controllers/errorController');


// Data Sanitization against XSS
app.use(xss());

// Set Security http headers
app.use(
    helmet.contentSecurityPolicy({
        directives: {
        defaultSrc: ["'self'", 'http://127.0.0.1:3000/*'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: ["'self'", 'https://*.cloudflare.com','https://*.stripe.com', 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js'],
        frameSrc: ["'self'", 'https://*.stripe.com'],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'https:', 'unsafe-inline'],
        upgradeInsecureRequests: [],
        }
    })
); 

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/task',taskRouter);

app.all('*',(req:Request,res:Response,next:NextFunction)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});


app.use(globalErrorHandler);

module.exports=app;