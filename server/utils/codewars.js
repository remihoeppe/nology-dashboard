const fetch = require("node-fetch");

const getCodeWarsInfo = async (username) => {
    const response = await fetch(
        `https://www.codewars.com/api/v1/users/${username}`,
    );
    return await response.json();
};

const getCodewarsScore = async (response, data) => {
    const promises = data.map(async (student) => {
        const accountsInfoP = student.accounts.map(async (account) => {
            return await getCodeWarsInfo(account.username);
        });

        const accountsInfo = await Promise.all(accountsInfoP);

        return {
            id: student.id,
            name: student.name,
            platform: student.accounts[0].platform,
            usernames: accountsInfo
                .reduce((acc, account) => {
                    return (
                        (account.username
                            ? account.username
                            : "Invalid username") +
                        ", " +
                        acc
                    );
                }, "")
                .slice(0, -2),
            score: accountsInfo.reduce((acc, student) => {
                return acc + (student.honor ? student.honor : 0);
            }, 0),
            // totalTest: accountsInfo.reduce((acc, student) => {
            //     return (
            //         acc +
            //         (student.codeChallenges.totalCompleted
            //             ? student.codeChallenges.totalCompleted
            //             : 0)
            //     );
            // }, 0),
        };
    });

    const results = await Promise.all(promises);
    return response.json(results);
};

module.exports = getCodewarsScore;
