import { DataTypes } from "sequelize";
import sequelize from "../database/db";
import { User } from "../models";

export const ToDo = sequelize.define("ToDo", {
  todo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

ToDo.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

(async () => {
  await ToDo.sync({ force: true });
})();
