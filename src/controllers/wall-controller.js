const postsService = require('../services/posts-service');


module.exports = {
    register: setupThisController
};


function setupThisController(app) {


    app.get('/wall/:userId', function(req, res) {
        console.log(req.headers.authorization)
        const userId = req.params.userId;
        postsService.getPostsOnWall(userId, function(posts) {
            let model = {
                userId: userId,
                posts: posts
            };

            res.render('wall', model);
        });

    });

    app.post('/wall/:userId/post', function(req, res) {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const strauth = new Buffer(b64auth, 'base64').toString()
  const splitIndex = strauth.indexOf(':')
  const senderId = strauth.substring(0, splitIndex)
        const userId = req.params.userId
  postsService.createPost(senderId, userId, req.body.content, function() {
      res.redirect('/wall/' + userId);
  })

    })




}