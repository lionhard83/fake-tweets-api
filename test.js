var assert = require('assert');
const request = require('supertest');
const app = require('./app');

describe('Test tweets api', function(){
    it('Sto testando la lettura dei tweet', function(done){
        request(app)
            .get('/tweets')
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
            .get('/tweets/count')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(typeof res.body.count, 'number');
                done(); 
            });
    })

    it('Sto aggiungendo tweet', function(done){
        request(app)
            .post('/tweets')
            .set('Accept', 'application/json')
            .send({
                author: 'carloleonardi', 
                message: 'Hello World'
            })
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto aggiungendo  un secondo tweet', function(done){
        request(app)
            .post('/tweets')
            .set('Accept', 'application/json')
            .send({
                author: 'carloleonardi', 
                message: 'Hello Spank'
            })
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto testando la lettura dei tweet by carloleonardi', function(done){
        request(app)
            .get('/tweets?author=carloleonardi')
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

    it('Sto testando la lettura dei tweet by word', function(done){
        var word = 'Hello World';
        request(app)
            .get(`/tweets?word=${word}`)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].message.indexOf(word) >= 0, true);
                done(); 
            });
    });

    it('Sto testando la lettura dei tweet by word', function(done){
        var word = 'Hello Spank';
        request(app)
            .get(`/tweets?word=${word}`)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].message.indexOf(word) >= 0, true);
                done(); 
            });
    });


    it('Sto eliminando un tweet', function(done){
        request(app)
        .get('/tweets/count')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            assert.equal(typeof res.body.count, 'number');
            var currentCount = res.body.count;
            request(app)
            .delete('/tweets/0')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                request(app)
                .get('/tweets/count')
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