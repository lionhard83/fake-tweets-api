var express = require('express');
// var app = express(); come in app.js
var router = express.Router();
var idGen = 2;
var tweets = [{
    id: 0,
    author: 'TechCrunch',
    message: 'Facebook now lets everyone unsend messages for up to 10 minutes https://techcrunch.com/2019/02/05/facebook-messenger-remove/ … by @JoshConstine'
}, {
    id: 1,
    author: 'JoshConstine',
    message: 'THREAD: After writing hundreds of articles about about apps this year, here’s my wishlist of feature launches like Twitter DM search & Uber “Quiet Ride”. First up, Instagram... 1/'
}];

router.get('/', function(req, res){
    if (req.query.word) {
        var temp = [];
        for(var tweet of tweets) {
            if (tweet.message.indexOf(req.query.word) >= 0) {
                temp.push(tweet);
            }
        }
        return res.json(temp);
    } else if (req.query.author) {
        var temp = [];
        for(var tweet of tweets) {
            if (tweet.author === req.query.author) {
                temp.push(tweet);
            }
        }
        return res.json(temp);
    }
    return res.json(tweets);
});

router.get('/count', function(req, res){
    res.json({count: tweets.length });
})
router.get('/reset', function(req, res){
    tweets = [{
        id: 0,
        author: 'TechCrunch',
        message: 'Facebook now lets everyone unsend messages for up to 10 minutes https://techcrunch.com/2019/02/05/facebook-messenger-remove/ … by @JoshConstine'
    }, {
        id: 1,
        author: 'JoshConstine',
        message: 'THREAD: After writing hundreds of articles about about apps this year, here’s my wishlist of feature launches like Twitter DM search & Uber “Quiet Ride”. First up, Instagram... 1/'
    }];
    idGen = 2;
    res.json();
})

router.get('/:id', function(req, res){
    for(var tweet of tweets) {
        if (tweet.id === parseInt(req.params.id)) {
            return res.json(tweet);
        }
    }
    res.status(404).json('Tweet not found');
})

router.delete('/:id', function(req, res){
    for(var i=0;  i < tweets.length; i++) {
        if (tweets[i].id === parseInt(req.params.id)) {
            tweets.splice(i, 1);
            return res.json('tweet deleted');
        }
    }
    res.status(404).json('tweet not found');
})

router.post('/',  function(req, res){
    var tweet = {
        id: idGen++,
        author: req.body.author,
        message: req.body.message,
    }
    tweets.push(tweet)
    res.status(201).json(tweet);
})

module.exports = router;