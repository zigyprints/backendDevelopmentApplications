import express from "express";
const app = express();
const PORT = 5050;

app.listen(PORT, ():void => {
    console.log(`This is working on ${PORT}`);
})

