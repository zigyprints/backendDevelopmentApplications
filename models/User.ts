import { DataTypes } from "sequelize";
import sequelize from "../database/db";

export const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await User.sync({ force: true });
})();
