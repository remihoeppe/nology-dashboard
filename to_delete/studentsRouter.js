const { response } = require("express");
const express = require("express");
const db = require("../db/studentsDb");
const router = express.Router();

// READ - Getting all students
router.get("/", async (request, response, next) => {
    try {
        let res = await db.getAllStudents();
        response.json(res);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

// READ - Getting a single student
router.get("/:id", async (request, response, next) => {
    try {
        let res = await db.getStudent(request.params.id);
        response.json(res);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

// CREATE - add ONE Student to table
router.post("/", async (request, response, next) => {
    try {
        let res = await db.createStudent(request.body);
        response.json(res);
    } catch (err) {
        console.log("Error while creating new student");
        next(err);
    }
});

// UDPATE - modify ONE  student
router.put("/:id", async (request, response, next) => {
    try {
        let res = await db.updateStudent(request.params.id, request.body);
        response.json(res);
    } catch (err) {
        console.log("Error occured while updating student");
        next(err);
    }
});

// DELETE - remove ONE student from table
router.delete("/:id", async (request, response, next) => {
    try {
        let res = await db.deleteStudent(request.params.id);
        response.json(res);
    } catch (err) {
        console.log("There was an error when deleting student");
        next(err);
    }
});

module.exports = router;
