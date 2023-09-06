import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/app.db",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to database");
  } catch (error) {
    console.error("Database connection failed");
  }
};

connectDB();

export default sequelize;
