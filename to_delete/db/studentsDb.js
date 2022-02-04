const { response } = require("express");
const mysql = require("mysql");
const pool = require("../configs/pool");

let studentsDd = {};

// READ - get ALL the students
studentsDd.getAllStudents = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM students`, (err, res) => {
            return err ? reject(err) : resolve(res);
        });
    });
};

// READ - get ONE student
studentsDd.getStudent = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM students WHERE id = ?`, [id], (err, res) => {
            return err ? reject(err) : resolve(res[0]);
        });
    });
};

// CREATE - add ONE student to table
studentsDd.createStudent = (student) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO students (name, cohort_id) VALUES (?, ?)`,
            [student.name, student.cohort_id],
            (err, res) => {
                return err
                    ? reject(err)
                    : resolve(`Student: ${student.name} created`);
            },
        );
    });
};

// UPDATE - modify ONE student
studentsDd.updateStudent = (id, student) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE students SET name = ?, cohort_id = ? WHERE id = ?`,
            [student.name, student.cohort_id, id],
            (err, res) => {
                return err
                    ? reject(err)
                    : resolve(`Student: ${student.name} updated`);
            },
        );
    });
};

// DELETE - remove ONE student from table
studentsDd.deleteStudent = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM students WHERE id = ?`, [id], (err, res) => {
            return err
                ? reject(err)
                : resolve(`Student with id: ${id} deleted`);
        });
    });
};

module.exports = studentsDd;

// add score to account table
// initialise to null || 0
// create an auto API call once a day to get score for each account (create a button on the front that would also trigger refresh)

// Start a function to get cohorts, when getting cohorts
// Cohorts -> students_id -> account_id -> API calls to get score

// Keep CRUD for each endpoint separated
