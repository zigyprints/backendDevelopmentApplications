const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


process.on('uncaughtException', (err:Error) => {
  console.log('UNHANDLED EXCEPTION!💥 Shutting down....')
  console.log(err.name,err.message);
  process.exit(1);
});


const app:any  = require('./app.ts');


const port = process.env.PORT || 5000;

const server = app.listen(port,()=> {
  console.log(`App is running in port ${port}`);
});

