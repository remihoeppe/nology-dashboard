const { response, request } = require("express");
const express = require("express");
const router = express.Router();
const db = require("./../configs/db");
const Test = require("./../models/Test");

// CREATE - add ONE test to the table
router.post("/", async (request, response, next) => {
    const { name, color, age } = request.body;
    if (!name || !color || !age) {
        return response.sendStatus(400);
    } else {
        const res = await Test.create(
            {
                name,
                color,
                age,
            },
            { fields: ["name", "color", "age"] },
        );
        response.json(res);
    }
});

// READ - gets ALL tests from DB
router.get("/", async (request, response, next) => {
    let res = await Test.findAll();
    response.json(res);
});

// READ - gets ONE test from DB
router.get("/:id", async (request, response, next) => {
    var res = await Test.findAll({
        where: {
            id: request.params.id,
        },
    });

    if (res.length === 0) {
        return response.sendStatus(404);
    }
    response.json(res[0]);
});

// UPDATE - modify exisiting test in table
router.put("/:id", async (request, response, next) => {
    const data = request.body;
    const reccord = await Test.findOne({ where: { id: request.params.id } });
    if (!reccord) {
        return response.sendStatus(404);
    }

    reccord.update(data);
    response.json(reccord);
});

// DELETE - remove ONE test from table
router.delete("/:id", async (request, response, next) => {
    let res = await Test.destroy({
        where: {
            id: request.params.id,
        },
    });

    if (!res) {
        console.log("Record not found");
        return response.sendStatus(404);
    }

    console.log(response.json(res));
});

module.exports = router;
