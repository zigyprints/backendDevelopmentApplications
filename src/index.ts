import express, { Application } from 'express';
import router from './routes/getTodos'; 
import bodyParser from 'body-parser';


const app: Application = express(); 

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);



app.listen(3000, () => {
    console.log("Server running at port 3000")
})




app.use('/', router);