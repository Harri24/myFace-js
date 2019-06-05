const usersService = require('../services/users-service');


module.exports = {
    register: setupThisController
};


function setupThisController(app) {


    app.get('/postboard', function(req, res) {

        usersService.getUsersFromPosts(function(users) {
            let model = {
                users: users
            };
            console.log(users);
            res.render('users', model);
        });

    });




}