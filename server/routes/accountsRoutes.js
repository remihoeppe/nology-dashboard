const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();
const db = require("./../configs/db");
const request = require("request");
const Account = require("./../models/Account");
const Student = require("../models/Student");
const { response } = require("express");
const getCodeWarsScore = require("./../utils/codewars");
const getHackerRankScore = require("./../utils/hackerranks");

//READ - get SCORE for ONE account
router.get(
    "/score/cohorts/:cohortId/platform/:platform",
    async (request, response) => {
        // Joining Students and Accounts tables
        // returning all students for a single cohort and for a given platform;

        const studentsInfo = await Student.findAll({
            where: {
                cohortId: request.params.cohortId,
            },
            include: [
                {
                    model: Account,
                    required: true,
                    where: { platform: request.params.platform },
                },
            ],
        });

        if (request.params.platform.toLowerCase() === "codewars") {
            return getCodeWarsScore(response, studentsInfo);
        } else if (request.params.platform.toLowerCase() === "hackerranks") {
            return getHackerRankScore(response, studentsInfo);
        } else {
            return response.json("This platform is not YET supported");
        }
    },
);

// CREATE - add ONE account to the table
router.post("/", async (request, response) => {
    const { platform, username, studentId } = request.body;
    if (!platform || !username || !studentId) {
        return response.sendStatus(400);
    } else {
        const res = await Account.create(
            {
                platform,
                username,
                studentId,
            },
            { fields: ["platform", "username", "studentId"] },
        );
        response.json(res);
    }
});

// READ - gets ALL accounts from DB
router.get("/", async (request, response) => {
    let res = await Account.findAll();
    response.json(res);
});

// READ - gets ONE account using id
router.get("/:id", async (request, response) => {
    let res = await Account.findAll({
        where: {
            id: request.params.id,
        },
    });

    if (res.length === 0) {
        return response.sendStatus(404);
    }
    response.json(res[0]);
});

// READ - gets ALL accounts with studentId
router.get("/byStudents/:id", async (request, response) => {
    let res = await Account.findAll({
        where: {
            studentId: request.params.id,
        },
    });

    if (res.length === 0) {
        return response.sendStatus(400);
    }

    response.json(res);
});

// UPDATE - modify exisiting account in table
router.put("/:id", async (request, response) => {
    const data = request.body;
    const reccord = await Account.findOne({ where: { id: request.params.id } });
    if (!reccord) {
        return response.sendStatus(404);
    }

    reccord.update(data);
    response.json(reccord);
});

// DELETE - remove ONE account from table
router.delete("/:id", async (request, response) => {
    let res = await Account.destroy({
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
