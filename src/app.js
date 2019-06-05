const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const indexController = require('./controllers/index-controller');
const usersController = require('./controllers/users-controller.js');
const wallController = require('./controllers/wall-controller.js');
const signupController = require('./controllers/sign-up-controller.js');
const userService = require('./services/user-service.js');
const postController = require('./controllers/posts-controller.js');

// SETUP EXPRESS
const app = express();
app.use(express.urlencoded());

// Use EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Serve static files from the 'static' folder
app.use(express.static('src/static'));

const port = 3000;

app.use(express.json())
app.use(function(req, res, next) {

    if(!req.headers.authorization){
        // TODO: Create authentication
        res.set({'WWW-Authenticate': 'Basic', realm: 'myFace'})
        res.send(401)
    } else {
        userService.authLogin(req.headers.authorization, function() {
            next();
        }, function () {
            res.set({'WWW-Authenticate': 'Basic', realm: 'myFace'})
            res.send(401)
        })
    }
});
        
indexController.register(app);
usersController.register(app);
wallController.register(app);
signupController.register(app);
postController.register(app);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
