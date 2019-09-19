const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
    describe('Get /', () => {
        it('returns status 200 OK', () => {
            return request(server).get('/')// returns a promise
            .then(res => {
                expect(res.status).toBe(200)
            })
        });
    });
});