const express = require("express");
const app = express();
const db = require("./configs/db");
db.sync();

const students = require("./routes/studentsRoute");
const cohorts = require("./routes/cohortsRoutes");
const accounts = require("./routes/accountsRoutes");

app.use(express.json());
app.use("/api/students", students);
app.use("/api/cohorts", cohorts);

app.use("/api/accounts", accounts);

app.listen(process.env.PORT || "3000", () => {
    console.log(`Server is running on port: ${process.env.PORT || "3000"}`);
});
