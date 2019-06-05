const databaseService = require('./database-service');
const base64 = require('base-64');
const bcrypt = require('bcrypt');

module.exports = {
    authLogin: authLogin,
};

function authLogin(login, successCallback, failureCallback) {
    const connection = databaseService.getConnection();

    let authStr = login;
    let basicAuthStr = authStr.startsWith("Basic");
    //console.log(basicAuthStr);
    let decode = authStr.substring(6);
    decode = base64.decode(decode);
    //console.log(decode);
    //console.log(basicString);
    let decodedLogin = decode.split(":");
    //console.log(decodedLogin); 


    const query = 'SELECT * FROM userInformation WHERE userName = ?'
    const parameters = decodedLogin[0];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        let hash = results[0].password;

        bcrypt.compare(decodedLogin[1], hash, function (err, res) {
            if (results.length > 0 && decodedLogin[0] === results[0].userName && res === true) {
                console.log('Auth function was successful');
                successCallback();
            } else {
                console.log('Auth service was a failure');
                failureCallback();
            };
        })

        ;
    })
}