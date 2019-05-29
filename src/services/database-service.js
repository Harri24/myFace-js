const mysql = require('mysql');


module.exports = {
    getConnection: getConnectionAndCreateIfNeeded
};


const serverName = 'apriltrainees.c9odsywzh0wu.us-east-2.rds.amazonaws.com';
const userName = 'joshPowell';
const password = 'password';
const databaseSchema = 'myFace';


let connection;

function getConnectionAndCreateIfNeeded() {
    if (connection === undefined) {
        setupConnection();
    }

    return connection;
}

function setupConnection() {
    connection = mysql.createConnection({
        host: serverName,
        user: userName,
        password: password,
        database: databaseSchema
    });

    connection.connect();
}
