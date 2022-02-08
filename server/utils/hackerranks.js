const { response } = require("express");
const fetch = require("node-fetch");

// B8r.2eh!mUa5B7M

const getResults = async (username, cursor = "") => {
    const response = await fetch(
        `https://www.hackerrank.com/rest/hackers/${username}/recent_challenges?limit=20&cursor=${cursor}&response_version=v2`,
    );
    return await response.json();
};

///////////

const getAllTestsFromPaginatedResult = async (username) => {
    const result = await getResults(username);
    let allTests = result.models;
    let lastPage = result.last_page;
    let cursor = result.cursor;

    while (lastPage === false) {
        const newResults = await getResults(username, cursor);

        for (let i = 0; i < newResults.models.length; i++) {
            allTests.push(newResults.models[i]);
        }
        lastPage = newResults.last_page;
        cursor = newResults.cursor;
    }

    return allTests;
};

const countTotalTest = (testsResponse) => {
    const scoreArr = testsResponse.map((testsArr) => {
        return testsArr.reduce((acc, test) => {
            if (test) return ++acc;
        }, 0);
    });

    return scoreArr.reduce((acc, score) => {
        return acc + score;
    });
};

const getUsernames = (studentObject) => {
    return studentObject.accounts
        .reduce((acc, account) => {
            return account.username + ", " + acc;
        }, "")
        .slice(0, -2);
};

const getHackerRankScore = async (response, students) => {
    const promises = students.map(async (student) => {
        const accountInfoP = student.accounts.map(async (account) => {
            return await getAllTestsFromPaginatedResult(account.username);
        });

        const testsResponse = await Promise.all(accountInfoP);
        const count = countTotalTest(testsResponse);

        return {
            id: student.id,
            name: student.name,
            platform: student.accounts[0].platform,
            usernames: getUsernames(student),
            score: count,
        };
    });

    const results = await Promise.all(promises);
    return response.json(results);
};

module.exports = getHackerRankScore;
