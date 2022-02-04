const { response } = require("express");
const mysql = require("mysql");
const pool = require("../configs/pool");

let cohortsDb = {};

// READ - get ALL cohorts
cohortsDb.getAllCohorts = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM cohorts`, (err, res) => {
            return err ? reject(err) : resolve(res);
        });
    });
};

// READ - get ONE cohort
cohortsDb.getCohort = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM cohorts WHERE id = ?`, [id], (err, res) => {
            return err ? reject(err) : resolve(res[0]);
        });
    });
};

// CREATE - add ONE cohort to table
cohortsDb.createCohort = (cohort) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO cohorts (name) VALUES (?)`,
            [cohort.name],
            (err, res) => {
                return err
                    ? reject(err)
                    : resolve(`New cohort: ${cohort.name}, has been added`);
            },
        );
    });
};

// UPDATE - modify ONE cohort in the table
cohortsDb.updateCohort = (id, cohort) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE cohorts SET name = ? WHERE id = ?`,
            [cohort.name, id],
            (err, res) => {
                return err
                    ? reject(err)
                    : resolve(
                          `Cohort: ${cohort.name} has been updated succesfully`,
                      );
            },
        );
    });
};

// DELETE - delete ONE cohort from the database
cohortsDb.deleteCohort = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM cohorts WHERE id = ?`, [id], (err, res) => {
            return err
                ? reject(err)
                : resolve(
                      `Cohort with id: ${id} has been successfuly deleted.`,
                  );
        });
    });
};

module.exports = cohortsDb;
