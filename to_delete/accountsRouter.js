const { response, request } = require("express");
const express = require("express");
const db = require("../db/accountsDb");
const router = express.Router();

// READ - get ALL accounts
router.get("/", async (request, response, next) => {
    try {
        let res = await db.getAllAccounts();
        response.json(res);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

// READ - get ONE account
router.get("/:id", async (request, response, next) => {
    try {
        let res = await db.getAccount(request.params.id);
        response.json(res);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

// CREATE - add ONE account to table
router.post("/", async (request, response, next) => {
    try {
        let res = await db.createAccount(request.body);
        response.json(res);
    } catch (err) {
        console.log("Error while creating new account");
        next(err);
    }
});

// UPDATE - modify ONE account in the table
router.put("/:id", async (request, response, next) => {
    try {
        let res = await db.updateAccount(request.params.id, request.body);
        response.json(res);
    } catch (err) {
        console.log(
            `Error while updating account for ${request.body.username}`,
        );
        next(err);
    }
});

// DELETE - delete ONE cohort from the database
router.delete("/:id", async (request, response, next) => {
    try {
        let res = await db.deleteAccount(request.params.id);
        response.json(res);
    } catch (err) {
        console.log(
            `There was an error when deleting account with id: ${request.params.id}`,
        );
    }
});

module.exports = router;
