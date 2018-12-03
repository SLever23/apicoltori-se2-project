const submission = require('./submissions.js')
const api = require('../../api.js');
const request = require('supertest');
const db = require('../../db/db.js');
const app = api.app;
//var server;
const v = '/v1';
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3000;

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:' + PORT + '/v1/submissions';

db.exams.push({ id: 0 });
db.users.push({ id: 0 });
db.tasks.push({ id: 0 });
db.exams.push({ id: 1 });
db.users.push({ id: 1 });
db.tasks.push({ id: 1 });

describe('Test GET submissions/:id', () => {
    //not correct
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

    //correct
    test('Id found in Submissions by GET/id', async (done) => {
        db.submissions.push({ id: 0, exam: 0, user: 0, task: 0, response: "response" });
        let id = 0;
        let response = await request(app).get(v + '/submissions/' + id);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ exam: 0, user: 0, task: 0, response: 'response', id: 0 })
        db.submissions.pop();
        done();
    })
});

describe('Test POST submissions', () => {
    //not correct
    test('Submission invalid POST, invalid body/submission', async (done) => {
        let response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send('ciao');
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(null);
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({ exam: 0, user: 0, task: 0, response: 344 });
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({ exam: 0, user: 'ciao', task: 0, response: 'ciao' });
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({ exam: null, user: 0, task: 0, response: 'ciao' });
        expect(response.status).toBe(400);
        done();
    })

    test('Submission invalid POST, invalid reference for the sumbission', async (done) => {
        let response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({ exam: 0, user: 0, task: 322, response: 'ciao' });
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({ exam: 0, user: 270, task: 0, response: 'ciao' });
        expect(response.status).toBe(400);

        response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({ exam: 234, user: 0, task: 0, response: 'ciao' });
        expect(response.status).toBe(400);
        done();
    })

    test('Submission first valid POST and second with the same object', async (done) => {
        expect(db.submissions.length).toBe(0);
        let response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({ exam: 0, user: 0, task: 0, response: 'ciao' });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 0, exam: 0, user: 0, task: 0, response: 'ciao' });

        response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({ exam: 0, user: 0, task: 0, response: 'ciao' });
        expect(response.status).toBe(400);
        db.submissions.pop();
        expect(db.submissions.length).toBe(0);
        done();
    })

    //correct
    test('Submission valid POST + GET/id', async (done) => {
        let response = await request(app).post(v + '/submissions/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send({ exam: 1, user: 1, task: 1, response: 'ciao' });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 0, exam: 1, user: 1, task: 1, response: 'ciao' });

        let id = 0;
        response = await request(app).get(v + '/submissions/' + id);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ exam: 1, user: 1, task: 1, response: 'ciao', id: 0 })

        db.submissions.pop();
        expect(db.submissions.length).toBe(0);
        done();
    })
});

function deletesubmission(id) {
    return fetch(SERVER_URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
}

//Da sistemare, risulta corretto sempre
/*describe('Test DELETE Submission', () => {
    //db.submissions.push({id: 0, exam: 1, user: 1, task: 1, response: 'ciao' });

    test('test invalid id for DELETE submission', () => {
        deletesubmission(null)
            .then(response => {
                expect(response.status).toBe(200);
            })

        deletesubmission('aa')
            .then(response => {
                expect(response.status).toBe(400);
            })
    })

    test('test inexistent id for DELETE submission', () => {
        deletesubmission(-23)
            .then(response => {
                expect(response.status).toBe(404);
            })

        deletesubmission(123)
            .then(response => {
                expect(response.status).toBe(404);
            })
    })

    test('test valid DELETE submission', () => {
        deletesubmission(0)
            .then(response => {
                expect(response.status).toBe(204);
            })
    })
});*/