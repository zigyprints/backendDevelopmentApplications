const express = require("express");
const morgan = require("morgan");
const viewRouter = require("./routes/viewRoutes");
const apiRouter = require("./routes/apiRoutes");

const app = express();

const connectDB = require("./db/connectDB");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.use(viewRouter);
app.use("/api", apiRouter);

app.use(morgan("tiny"));
app.set("view engine", "ejs");

connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("listening on *:3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
