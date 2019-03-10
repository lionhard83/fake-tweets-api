var assert = require('assert');
const request = require('supertest');
const app = require('./app');

describe('Test posts api', function(){
    it('Sto testando la lettura dei post', function(done){
        request(app)
            .get('/posts')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 2);
                done(); 
            });
    });

    it('Sto testando il count', function(done){
        request(app)
            .get('/posts/count')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(typeof res.body.count, 'number');
                done(); 
            });
    })

    it('Sto aggiungendo post', function(done){
        request(app)
            .post('/posts')
            .set('Accept', 'application/json')
            .send({
                author: 'carloleonardi', 
                message: 'Hello World',
                image: 'image'
            })
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto aggiungendo un secondo post', function(done){
        request(app)
            .post('/posts')
            .set('Accept', 'application/json')
            .send({
                author: 'carloleonardi', 
                message: 'Hello Spank',
                image: 'image'
            })
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto aggiungendo un commento al secondo post', function(done){
        request(app)
            .post('/posts/1/comments')
            .set('Accept', 'application/json')
            .send({
                author: 'carloleonardi', 
                message: 'Hello Spank',
            })
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto aggiungendo un likes al secondo post', function(done){
        request(app)
            .post('/posts/1/likes')
            .set('Accept', 'application/json')
            .send({
                author: 'carloleonardi', 
            })
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto testando la lettura dei post by carloleonardi', function(done){
        request(app)
            .get('/posts?author=carloleonardi')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 2);
                assert.equal(res.body[0].author, 'carloleonardi');
                assert.equal(res.body[1].author, 'carloleonardi');
                done(); 
            });
    });

    it('Sto testando la lettura dei post by word', function(done){
        var word = 'Hello World';
        request(app)
            .get(`/posts?word=${word}`)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].message.indexOf(word) >= 0, true);
                done(); 
            });
    });

    it('Sto testando la lettura dei post by word', function(done){
        var word = 'Hello Spank';
        request(app)
            .get(`/posts?word=${word}`)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].message.indexOf(word) >= 0, true);
                done(); 
            });
    });


    it('Sto eliminando un post', function(done){
        request(app)
        .get('/posts/count')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            assert.equal(typeof res.body.count, 'number');
            var currentCount = res.body.count;
            request(app)
            .delete('/posts/0')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                request(app)
                .get('/posts/count')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    assert.equal(typeof res.body.count, 'number');
                    assert.equal(res.body.count, currentCount - 1);
                    done(); 
                });
            });
        });
        
    })
})