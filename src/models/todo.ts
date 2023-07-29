import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";

//Declare Todo model
class Todo extends Model{
    public id!: number;
    public text!: string;
    public done!: boolean;
    public duedate!: Date;
}

Todo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        duedate: {
            type: DataTypes.DATE,
            allowNull: true,
        }

    },
    {
        sequelize,
        modelName: 'Todo', //The model wil be saved by the name 'Todo'
    }
);

export default Todo;