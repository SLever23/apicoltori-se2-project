const topics = require('./topics.js');
const api = require('../../api.js');
const request = require('supertest');
const db = require('../../db/db.js');
const app = api.app;

const v = '/v1';

describe('Test the topics/:id path', () => {

    test('Bad request in GET topic by id', async () => {
        var id = 'abc';
        var response = await request(app).get(v + '/topics/' + id);
        expect(response.status).toBe(400);
        id = '123as';
        response = await request(app).get(v + '/topics/' + id);
        expect(response.status).toBe(400);
    });

    test('Not found in GET topic by id', async () => {
        var id;
        var f = db.topics.forEach((element, index, arr) => {
            if (element == undefined) {
                id = index;
            }
        });
        if (id != undefined) {
            var response = await request(app).get(v + '/topics/' + id);
            expect(response.status).toBe(404);
        }
        // Big enough to be out of array
        id = 50000;
        var response = await request(app).get(v + '/topics/' + id);
        expect(response.status).toBe(404);
    });

    test('Success in GET topic by id', async () => {
        var id = '1';
        var topic = db.get_topic_obj();
        topic.id = 1;
        topic.title = 'Github';
        db.topics[1] = topic;
        var response = await request(app).get(v + '/topics/' + id);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.id).toBe(1);
        expect(response.body.title).toBe('Github');
    });
});

describe('Test the topics/ path', () => {
    test('Bad request in POST topics', async () => {
        var topic = db.get_topic_obj;
        topic.title = null;
        var response = await request(app).post(v + '/topics/').send(topic)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        topic.title = 123;
        response = await request(app).post(v + '/topics/').send(topic)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        response = await request(app).post(v + '/topics/').send(null)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
    });

    test('Success in POST topics', async () => {
        var topic = db.get_topic_obj();
        topic.title = 'API Design';
        var response = await request(app).post(v + '/topics/').send(topic)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(db.topics.length - 1);
        expect(response.body.title).toBe(topic.title);
        topic.id = 'asdf';
        var response = await request(app).post(v + '/topics/').send(topic)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(db.topics.length - 1);
        expect(response.body.title).toBe(topic.title);
    });
});