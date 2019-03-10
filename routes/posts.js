var express = require('express');
// var app = express(); come in app.js
var router = express.Router();
var idGen = 2;
var posts = [{
    id: 0,
    author: 'TechCrunch',
    image: 'https://www.smartworld.it/wp-content/uploads/2018/07/Facebook-Mark-Zuckerberg.jpg',
    message: 'Facebook now lets everyone unsend messages for up to 10 minutes https://techcrunch.com/2019/02/05/facebook-messenger-remove/ … by @JoshConstine',
    likes: ['markZuck', 'donnie', 'EduardoSaverin', 'DMoskovitz'],
    comments: [{
        author: 'markZuck',
        message: '👏👏👏'
    }],
}, {
    id: 1,
    author: 'JoshConstine',
    image: 'https://pbs.twimg.com/media/D1KNUQ8VAAAEx8L.jpg',
    message: 'THREAD: After writing hundreds of articles about about apps this year, here’s my wishlist of feature launches like Twitter DM search & Uber “Quiet Ride”. First up, Instagram... 1/',
    likes: ['nick', 'steve2'],
    comments: [{
        author: 'steve2',
        message: 'Thanks 🖐'
    }, {
        author: 'JoshConstine',
        message: 'No problem'
    }],
}];

router.get('/', function(req, res){
    if (req.query.word) {
        var temp = [];
        for(var post of posts) {
            if (post.message.indexOf(req.query.word) >= 0) {
                temp.push(post);
            }
        }
        return res.json(temp);
    } else if (req.query.author) {
        var temp = [];
        for(var post of posts) {
            if (post.author === req.query.author) {
                temp.push(post);
            }
        }
        return res.json(temp);
    }
    return res.json(posts);
});

router.get('/count', function(req, res){
    res.json({count: posts.length });
})
router.get('/reset', function(req, res){
    posts = [{
        id: 0,
        author: 'TechCrunch',
        image: 'https://www.smartworld.it/wp-content/uploads/2018/07/Facebook-Mark-Zuckerberg.jpg',
        message: 'Facebook now lets everyone unsend messages for up to 10 minutes https://techcrunch.com/2019/02/05/facebook-messenger-remove/ … by @JoshConstine',
        likes: ['markZuck', 'donnie', 'EduardoSaverin', 'DMoskovitz'],
        comments: [{
            author: 'markZuck',
            message: '👏👏👏'
        }],
    }, {
        id: 1,
        author: 'JoshConstine',
        image: 'https://pbs.twimg.com/media/D1KNUQ8VAAAEx8L.jpg',
        message: 'THREAD: After writing hundreds of articles about about apps this year, here’s my wishlist of feature launches like Twitter DM search & Uber “Quiet Ride”. First up, Instagram... 1/',
        likes: ['nick', 'steve2'],
        comments: [{
            author: 'steve2',
            message: 'Thanks 🖐'
        }, {
            author: 'JoshConstine',
            message: 'No problem'
        }],
    }]
    idGen = 2;
    res.json();
})

router.get('/:id', function(req, res){
    for(var post of posts) {
        if (post.id === parseInt(req.params.id)) {
            return res.json(post);
        }
    }
    res.status(404).json('post not found');
})

router.post('/:id/comments', function(req, res){
    if (!req.body.author || !req.body.message) {
        return res.status(400).json('Missing params: author or message!')
    }
    for(var post of posts) {
        if (post.id === parseInt(req.params.id)) {
            var comment = {
               author: req.body.author,
               message: req.body.message,
            }
            post.comments.push(comment);
            return res.status(201).json(post);
        }
    }
    res.status(404).json('post not found');
})

router.post('/:id/likes', function(req, res){
    if (!req.body.author) {
        return res.status(400).json('Missing params: author!')
    }
    for(var post of posts) {
        if (post.id === parseInt(req.params.id)) {
            post.likes.push(req.body.author);
            return res.status(201).json(post);
        }
    }
    res.status(404).json('post not found');
})

router.delete('/:id', function(req, res){
    for(var i=0;  i < posts.length; i++) {
        if (posts[i].id === parseInt(req.params.id)) {
            posts.splice(i, 1);
            return res.json('post deleted');
        }
    }
    res.status(404).json('post not found');
})

router.post('/',  function(req, res){
    if (!req.body.author || !req.body.image || !req.body.message) {
        return res.status(400).json('Missing params: author or image or message!')
    }
    var post = {
        id: idGen++,
        author: req.body.author,
        image: req.body.image,
        message: req.body.message,
    }
    posts.push(post)
    res.status(201).json(post);
})

module.exports = router;