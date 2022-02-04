const { response } = require("express");
const mysql = require("mysql");
const pool = require("../configs/pool");

let accountsDb = {};

// READ - get ALL accounts
accountsDb.getAllAccounts = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM accounts`, (err, res) => {
            return err ? reject(err) : resolve(res);
        });
    });
};

// READ - get ONE account
accountsDb.getAccount = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM accounts WHERE id = ?`, [id], (err, res) => {
            return err ? reject(err) : resolve(res);
        });
    });
};

// CREATE - add ONE account to table
accountsDb.createAccount = (account) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO accounts (platform, username, student_id) VALUES (?, ?, ?)`,
            [account.platform, account.username, account.student_id],
            (err, res) => {
                return err
                    ? reject(err)
                    : resolve(
                          `New Account for ${account.username} on ${account.platform} has been added`,
                      );
            },
        );
    });
};

// // UPDATE - modify ONE account in the table

accountsDb.updateAccount = async (id, data) => {
    if (Object.keys(data).length === 0) return null;
    let sql = `UPDATE accounts SET`;
    const newValues = [];

    Object.entries(data).forEach(([key, value]) => {
        sql += ` ${key} = ?,`;
        newValues.push(value);
    });
    sql = sql.slice(0, -1);
    sql += ` WHERE id = ?`;

    newValues.push(id);

    return new Promise((resolve, reject) => {
        pool.query(sql, newValues, (err, res) => {
            return err
                ? reject(err)
                : resolve(`Account has been updated succesfully`);
        });
    });
};

// DELETE - delete ON account from the table

accountsDb.deleteAccount = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM accounts WHERE id = ?`, [id], (err, res) => {
            return err
                ? reject(err)
                : resolve(
                      `Account with id: ${id} has been successfuly deleted.`,
                  );
        });
    });
};

module.exports = accountsDb;
