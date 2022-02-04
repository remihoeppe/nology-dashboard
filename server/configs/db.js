const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("dashboard", "root", "MyPass", {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
});

module.exports = sequelize;
