const { DataTypes } = require("sequelize");
const db = require("../configs/db");
const Student = require("./Student");

const Account = db.define("account", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    platform: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Account;
