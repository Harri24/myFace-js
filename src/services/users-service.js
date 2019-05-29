const databaseService = require('./database-service');


module.exports = {
    getUsersFromPosts: getUsersFromPosts
};


function getUsersFromPosts(callback) {
    const connection = databaseService.getConnection();

    const query = '(SELECT DISTINCT recipient as user FROM posts) UNION (SELECT DISTINCT sender as user FROM posts)';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}

