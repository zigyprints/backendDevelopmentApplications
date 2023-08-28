import mongoose, { ConnectOptions } from "mongoose";

const uri: string = 'mongodb+srv://babrerushabh1:J3pKvyZdaNsm9dQ4@todos.zrml53b.mongodb.net/';

mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        poolSize: parseInt(process.env.POOL_SIZE!),
      } as ConnectOptions)
      .then((res) => {
        console.log(
          'Connected to Database - Initial Connection'
        );
      })
      .catch((err) => {
        console.log(
          `Database connection error occured -`,
          err
        );
});

export default mongoose; // Use ES6 export
