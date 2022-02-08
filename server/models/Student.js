const { DataTypes } = require("sequelize");
const db = require("../configs/db");
const Account = require("./Account");

const Student = db.define("student", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Student.Accounts = Student.hasMany(Account);
Account.belongsTo(Student);

module.exports = Student;
