const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');

const app = express();


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

app.get('/mango',(req:any,res:any)=>{
    res.status(200).json({
        data: ['mango1','mango2']
    });
});

module.exports=app;