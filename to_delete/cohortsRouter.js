const { response, request } = require("express");
const express = require("express");
const db = require("../db/cohortsDb");
const router = express.Router();

// READ - get ALL cohorts
router.get("/", async (request, response, next) => {
    try {
        let res = await db.getAllCohorts();
        response.json(res);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

// READ - get ONE cohort
router.get("/:id", async (request, response, next) => {
    try {
        let res = await db.getCohort(request.params.id);
        response.json(res);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

// CREATE - add ONE cohort to table
router.post("/", async (request, response, next) => {
    try {
        let res = await db.createCohort(request.body);
        response.json(res);
    } catch (err) {
        console.log("Error while creating new cohort");
        next(err);
    }
});

// UPDATE - modify ONE cohort in the table
router.put("/:id", async (request, response, next) => {
    try {
        let res = await db.updateCohort(request.params.id, request.body);
        response.json(res);
    } catch (err) {
        console.log(`Error while updating cohort ${request.body.name}`);
        next(err);
    }
});

// DELETE - delete ONE cohort from the database
router.delete("/:id", async (request, response, next) => {
    try {
        let res = await db.deleteCohort(request.params.id);
        response.json(res);
    } catch (err) {
        console.log(
            `There was an error when deleting cohort with id: ${request.params.id}`,
        );
    }
});

module.exports = router;
