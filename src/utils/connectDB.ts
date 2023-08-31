import mongoose from "mongoose";

const connectDBWithRetry = (mongoURL : string) => {
    mongoose
        .connect(mongoURL)
        .then(() => console.log("Successfully connected to DB"))
        .catch((e) => {
            console.log(e)
            setTimeout(() => connectDBWithRetry(mongoURL), 5000) // if not connected, tries to reconnect to the DB every 5 seconds
});
}

export default connectDBWithRetry;