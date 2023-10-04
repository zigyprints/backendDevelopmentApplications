const mongoose = require("mongoose");

require("dotenv").config();

//ERROR HANDLING STUFF IN TERMINAL
mongoose.set("strictQuery", false);

function connectToMongoDB() {
	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((err) => console.log(`DB connection failed: ${err}`));
}

module.exports = connectToMongoDB;
