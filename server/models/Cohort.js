const { DataTypes } = require("sequelize");
const db = require("../configs/db");
const Student = require("./Student");

const Cohort = db.define("cohort", {
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

Cohort.Students = Cohort.hasMany(Student);

module.exports = Cohort;
