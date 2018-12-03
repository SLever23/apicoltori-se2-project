const topics = require('./topics.js');
const api = require('../../api.js');
const request = require('supertest');
const db = require('../../db/db.js');
const app = api.app;
var server;
const v = '/v1';

describe('Test GET topics/:id', () => {

    test('Bad request with non-number id', async (done) => {
        let id = '123abc';
        let response = await request(app).get(v + '/topics/' + id);
        expect(response.status).toBe(400);
        done();
    });

    test('Bad request with negative id', async (done) => {
        let id = -12;
        let response = await request(app).get(v + '/topics/' + id);
        expect(response.status).toBe(400);
        done();
    });

    test('Not found', async (done) => {
        // Big enough to be out of array
        let id = 50000;
        let response = await request(app).get(v + '/topics/' + id);
        expect(response.status).toBe(404);
        done();
    });

    test('Not found because deleted', async (done) => {
        let id;
        let f = db.topics.forEach((element, index, arr) => {
            if (element == undefined) {
                id = index;
            }
        });
        if (id != undefined) {
            let response = await request(app).get(v + '/topics/' + id);
            expect(response.status).toBe(404);
        }
        done();
    });

    test('Success', async (done) => {
        let id = '1';
        let topic = db.get_topic_obj();
        topic.id = 1;
        topic.title = 'Github';
        db.topics[1] = topic;
        let response = await request(app).get(v + '/topics/' + id);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.id).toBe(1);
        expect(response.body.title).toBe('Github');
        done();
    });
});

describe('Test POST topics/', () => {
    test('Bad request - topic.title is null', async (done) => {
        let topic = db.get_topic_obj;
        topic.title = null;
        let response = await request(app).post(v + '/topics/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(topic);
        expect(response.status).toBe(400);
        done();
    });

    test('Bad request - topic.title is not string', async (done) => {
        let topic = db.get_topic_obj;
        topic.title = 123;
        let response = await request(app).post(v + '/topics/')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(topic);
        expect(response.status).toBe(400);
        done();
    });

    test('Bad request - payload is null', async (done) => {
        let response = await request(app).post(v + '/topics/').send(null)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        expect(response.status).toBe(400);
        done();
    });

    test('Success - Payload has only title', async (done) => {
        let topic = db.get_topic_obj();
        topic.title = 'API Design';
        let response = await request(app).post(v + '/topics/').send(topic)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(db.topics.length - 1);
        expect(response.body.title).toBe(topic.title);
        done();
    });

    test('Success - id attribute in payload is ignored', async (done) => {
        let topic = db.get_topic_obj();
        topic.title = 'API Design';
        topic.id = 'Ignore me';
        let response = await request(app).post(v + '/topics/').send(topic)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(db.topics.length - 1);
        expect(response.body.title).toBe(topic.title);
        done();
    });
});

describe('Test GET topics/', () => {

    test('Bad request - payload is not empty', async (done) => {
        let response = await request(app).get(v + '/topics/').send({topic: 'ciao'})
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        done();
    });

    test('Bad request - query params are not empty', async (done) => {
        let response = await request(app).get(v + '/topics?query_param=true')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        done();
    });

    test('Success', async (done) => {
        let response = await request(app).get(v + '/topics/')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        let f = response.body.forEach(element => {
            expect(element).not.toBeNull();
            expect(element).toEqual(db.topics[element.id]);
        });
        // expect(response.body).toEqual(db.topics);
        done();
    });
});