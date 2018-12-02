const reviews = require('./reviews.js');
const api = require('../../api.js');
const request = require('supertest');
const db = require('../../db/db.js');
const app = api.app;
var server;
const v = '/v1';

db.reviews.push({id:0, exam: 1, user: 1, task: 1, response: 'response'});
db.exams.push({id: 1});
db.users.push({id: 1});
db.tasks.push({id: 1});
db.exams.push({id: 2});
db.users.push({id: 2});
db.tasks.push({id: 2});

describe('Test POST reviews/', () => {
    // valid test
    test('Success - Review valid POST', async (done) => {
        let response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 1, user: 2, task: 1, response: 'response'});
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id: 1, exam: 1, user: 2, task: 1, response: 'response'});
        db.reviews.pop();
        done();
    });
    // invalid test
    test('Bad request - Review invalid POST', async (done) => {
        let response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send('string');
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 1, user: 1, task: 1, response: 'response'});
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(null);
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: null, user: 1, task: 1, response: 'response'});
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 1, user: null, task: 1, response: 'response'});
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 1, user: 1, task: null, response: 'response'});
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 'ciao', user: 1, task: 1, response: 'response'});
        expect(response.status).toBe(400);
        
        done();
    });

    test('Bad request - Review invalid POST - invalid reference for the review', async (done) => {
        let response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 2, user: 0, task: 2, response: 'response'});
        expect(response.status).toBe(400);
        done();
    });
    test('Reviews two POST with the same object', async (done) => {
        let response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 1, user: 2, task: 1, response: 'ciao'});
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id:1, exam: 1, user: 2, task: 1, response: 'ciao'});

        response = await request(app).post(v + '/reviews/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 0, user: 0, task: 0, response: 'ciao'});
        expect(response.status).toBe(400);
        done();
    })
});

describe('Test GET reviews/', () => {
    // valid test
    test('Success - Review valid GET with all input', async (done) => {
        let response = await request(app).get(v + '/reviews?exam=1&user=1&task=1').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send();
        expect(response.status).toBe(200);
        done();
    });
    test('Success - Review valid GET without id task', async (done) => {
        let response = await request(app).get(v + '/reviews?exam=1&user=1').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send();
        expect(response.status).toBe(200);
        done();
    });
    //invalid test
    test('Not found - Review valid GET parameters not exist' , async (done) => {
        let response = await request(app).get(v + '/reviews?exam=3&user=3&task=3').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send();
        expect(response.status).toBe(404);
        done();
    });
    test('Not found - Review valid GET examId not found', async (done) => {
        let response = await request(app).get(v + '/reviews?exam=3&user=1').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send();
        expect(response.status).toBe(404);
        done();
    });
    test('Not found - Review valid GET userId not found', async (done) => {
        let response = await request(app).get(v + '/reviews?exam=1&user=3').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send();
        expect(response.status).toBe(404);
        done();
    });
    test('Not found - Review valid GET taskId not found', async (done) => {
        let response = await request(app).get(v + '/reviews?exam=1&user=1&task=3').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send();
        expect(response.status).toBe(404);
        done();
    });
    test('Bad request - bad parameters in input', async (done) => {
        let response = await request(app).get(v + '/reviews?exam=ciao&user=3').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send();
        expect(response.status).toBe(400);
        done();
    });
    test('Bad request - bad parameters in input', async (done) => {
        let response = await request(app).get(v + '/reviews?exam=1&user=ciao').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send();
        expect(response.status).toBe(400);
        done();
    });
    test('Bad request - bad parameters in input', async (done) => {
        let response = await request(app).get(v + '/reviews?exam=1&user=1&task=ciao').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send();
        expect(response.status).toBe(400);
        done();
    });

});