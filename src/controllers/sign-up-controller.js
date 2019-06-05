const signupService = require('../services/signup-service')


module.exports = {
    register: setupThisController

};

function setupThisController(app) {


    app.get('/signup', function(req, res) {
        res.render('signup');
    });

    app.post('/signup', function(req, res) {
        let userName = req.body.userName;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let DOB = req.body.DOB;
        let email = req.body.email;
        let gender = req.body.gender

        signupService.addUser(userName,  password, firstName, lastName, DOB, email, gender, function() {
            // Redirect the user to the URL: /about
            res.redirect('/signup');
        })
        //res.end(501); // 501: Not Implemented
    })


}




