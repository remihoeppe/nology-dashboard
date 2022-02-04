const { response, request } = require("express");
const express = require("express");
const router = express.Router();
const db = require("./../configs/db");
const Cohort = require("./../models/Cohort");

// CREATE - add ONE cohort to the table
router.post("/", async (request, response) => {
    const { name } = request.body;
    if (!name) {
        return response.sendStatus(400);
    } else {
        const res = await Cohort.create(
            {
                name,
            },
            { fields: ["name"] },
        );
        response.json(res);
    }
});

// READ - gets ALL cohorts from DB
router.get("/", async (request, response) => {
    let res = await Cohort.findAll();
    response.json(res);
});

// READ - gets ONE cohort by id
router.get("/:id", async (request, response, next) => {
    var res = await Cohort.findAll({
        where: {
            id: request.params.id,
        },
    });

    if (res.length === 0) {
        return response.sendStatus(404);
    }
    response.json(res[0]);
});

// UPDATE - modify exisiting cohort in table
router.put("/:id", async (request, response) => {
    const data = request.body;
    const reccord = await Cohort.findOne({ where: { id: request.params.id } });
    if (!reccord) {
        return response.sendStatus(404);
    }

    reccord.update(data);
    response.json(reccord);
});

// DELETE - remove ONE cohort from table
router.delete("/:id", async (request, response) => {
    let res = await Cohort.destroy({
        where: {
            id: request.params.id,
        },
    });

    if (!res) {
        return response.sendStatus(404);
    }

    response.json(res);
});

module.exports = router;
