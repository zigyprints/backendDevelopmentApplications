import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Todo from "./todo";

class User extends Model{
    public id!: number;
    public username!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    },
    {
        sequelize,
        modelName: 'Todo', //The model wil be saved by the name 'Todo'
    }
);

export default User;