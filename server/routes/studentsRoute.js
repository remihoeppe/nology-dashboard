const { response, request } = require("express");
const express = require("express");
const router = express.Router();
const db = require("./../configs/db");
const Student = require("./../models/Student");

// CREATE - add ONE student to the table
router.post("/", async (request, response) => {
    const { name, cohortId } = request.body;
    if (!name || !cohortId) {
        return response.sendStatus(400);
    } else {
        const res = await Student.create(
            {
                name,
                cohortId: cohortId,
            },
            { fields: ["name", "cohortId"] },
        );
        response.json(res);
    }
});

// READ - gets ALL students from DB
router.get("/", async (request, response) => {
    let res = await Student.findAll();
    response.json(res);
});

// READ - gets ONE student by id
router.get("/:id", async (request, response, next) => {
    var res = await Student.findAll({
        where: {
            id: request.params.id,
        },
    });

    if (res.length === 0) {
        return response.sendStatus(404);
    }
    response.json(res[0]);
});

// READ - gets ALL students with cohortID
router.get("/byCohorts/:id", async (request, response) => {
    let res = await Student.findAll({
        where: {
            cohortId: request.params.id,
        },
    });

    if (res.length === 0) {
        return response.sendStatus(400);
    }

    response.json(res);
});

// UPDATE - modify exisiting student in table
router.put("/:id", async (request, response) => {
    const data = request.body;
    const reccord = await Student.findOne({ where: { id: request.params.id } });
    if (!reccord) {
        return response.sendStatus(404);
    }

    reccord.update(data);
    response.json(reccord);
});

// DELETE - remove ONE student from table
router.delete("/:id", async (request, response) => {
    let res = await Student.destroy({
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
