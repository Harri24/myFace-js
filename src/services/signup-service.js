const databaseService = require('./database-service');
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = {
    addUser: addUser,
   // comparePassword: comparePassword,

};

function addUser(userName, password, firstName, lastName, DOB, email, gender, callback) {
    const connection = databaseService.getConnection();

    bcrypt.hash(password, saltRounds, function (err, hash) {
        const query = 'INSERT INTO userInformation (userName, password, firstName, lastName, DOB, email, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const parameters = [userName, hash, firstName, lastName, DOB, email, gender];

        connection.query(query, parameters, function (error, results, fields) {
            if (error) throw error;
            callback();
        });
    });
}



