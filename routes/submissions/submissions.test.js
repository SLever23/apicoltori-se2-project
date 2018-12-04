const submission = require('./submissions.js')
const api = require('../../api.js');
const request = require('supertest');
const db = require('../../db/db.js');
const app = api.app;

const v = '/v1';

describe('Test GET submissions/:id', () => {
    test('Wrong id in GET/id request', async (done) => {
        let id = 'aa';
        let response = await request(app).get(v + '/submissions/' + id);
        expect(response.status).toBe(400);
        done();
    })

    test('Id not found in Submissions by GET/id', async (done) => {
        let id = -12;
        let response = await request(app).get(v + '/submissions/' + id);
        expect(response.status).toBe(404);

        id = 321;
        response = await request(app).get(v + '/submissions/' + id);
        expect(response.status).toBe(404);
        done();
    })

    test('Id found in Submissions by GET/id', async (done) => {
        db.submissions.push({id: 0, exam: 0, user: 0, task: 0, response: "response"});
        let id=0;
        let response = await request(app).get(v + '/submissions/' + id);
        expect(response.status).toBe(200);
        db.submissions.pop();
        done();
    })
});

describe('Test POST submissions', () => {
    test('Submission invalid POST, invalid body/submission', async (done) => {
        let response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send('ciao');
        expect(response.status).toBe(400);
        
        response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(null);
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 0, user: 0, task: 0, response: 344});
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 0, user: 'ciao', task: 0, response: 'ciao'});
        expect(response.status).toBe(400);
        done();
    })

    test('Submission invalid POST, invalid reference for the sumbission', async (done) => {
        db.exams.push({id: 0});
        db.tasks.push({id: 0});

        let response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 0, user: 0, task: 0, response: 'ciao'});
        expect(response.status).toBe(400);
        done();
    })

    test('Submission valid POST', async (done) => {
        db.exams.push({id: 0});
        db.users.push({id: 0});
        db.tasks.push({id: 0});

        let response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({exam: 0, user: 0, task: 0, response: 'ciao'});
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id:0, exam: 0, user: 0, task: 0, response: 'ciao'});
        done();
    })
});