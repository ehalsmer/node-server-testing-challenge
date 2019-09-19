const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');

describe('users-router.js', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })
    describe('GET /api/users', () => {
        it('returns status 200 OK', () => {
            return request(server).get('/api/users')
            .then(res => {
                expect(res.status).toBe(200)
            })
        });
        it('returns an array of users', () => {
            
        });
    });

    describe('GET /api/users/:id', () => {
        it('returns status 200 OK', async () => {
            let firstId = await db('users').first().id;
            return request(server).get(`/api/users/${firstId}`)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.id).toBe(firstId)
            })
        });
    });

    describe('POST /api/users', () => {
        it('returns status 201 after post', async () => {
            return request(server).post('/api/users').send({username: 'jason'})
        });
        it('inserted new user into db', async () => {
            const [id] = await db('users').insert({username: 'test'})
            let newUser = await db('users').where({id}).first();
            expect(newUser.username).toBe('test')
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('returns status 200 after delete', async () => {
            let firstId = await db('users').first().id;
            return request(server).delete(`/api/users/${firstId}`)
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('deleted the user with given id after DELETE /api/users/:id', async () => {
            let firstId = await db('users').first().id;
            request(server).delete(`/api/users/${firstId}`)
            .then(res => {
                let deleted = db('users').where('id', firstId);
                expect(deleted.id).toBeUndefined();
            })
        })
    })
});