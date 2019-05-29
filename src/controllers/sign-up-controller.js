module.exports = {
    register: setupThisController
};


function setupThisController(app) {


    app.get('/signup', function(req, res) {
        res.render('signup');
    });

    app.post('/signup', function(req, res) {
        // TODO: signup code
        res.end(501); // 501: Not Implemented
    })
}