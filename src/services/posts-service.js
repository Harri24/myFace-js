const databaseService = require('./database-service');


module.exports = {
    getPostsOnWall: getPostsOnWall,
    createPost: createPost
};


function getPostsOnWall(recipient, callback) {
    const connection = databaseService.getConnection();

    const query = 'SELECT * FROM posts WHERE recipient = ?';
    const params = [recipient];

    connection.query(query, params, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}


function createPost(sender, recipient, message, callback) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO posts (sender, recipient, content) VALUES (? , ? , ?)';
    const parameters = [sender, recipient, message];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}
