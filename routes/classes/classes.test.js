/*const classes = require('./classes.js');
const api = require('../../api.js');
const request = require('api.js');
const db = require('../../db/db.js');
const app = api.app;
var server;
const v = '/v1';

beforeAll(() => {
    let PORT = process.env.PORT || 3000;
    server = app.listen(PORT, () => {});
});
afterAll(() => {
    server.close();
});

describe('Test GET classes/', () => {

    test('Bad request with non-number id', async (done) => {
        let id = '123abc';
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(401);
        done();
    });

    test('Bad request with negative id', async (done) => {
        let id = -12;
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(401);
        done();
    });

    test('Not found', async (done) => {
        // Big enough to be out of array
        let id = 50000;
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(404);
        done();
    });

    test('Not found because deleted', async (done) => {
        let id;
        let f = db.classes.forEach((element, index, arr) => {
            if (element == undefined) {
                id = index;
            }
        });
        if (id != undefined) {
            let response = await request(app).get(v + '/classes/' + id);
            expect(response.status).toBe(404);
        }
        done();
    });

    test('Success', async (done) => {
        let id = '1';
        let topic = db.get_topic_obj();
        topic.id = 1;
        topic.title = 'Github';
        db.classes[1] = topic;
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.id).toBe(1);
        expect(response.body.title).toBe('Github');
        done();
    });

});

describe('Test POST classes/', () => {
    
    test('Bad request - topic.title is null', async (done) => {
        let topic = db.get_topic_obj;
        topic.title = null;
        let response = await request(app).post(v + '/classes/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(topic);
        expect(response.status).toBe(500);
        done();
    });

    test('Bad request - topic.title is not string', async (done) => {
        let topic = db.get_topic_obj;
        topic.title = 123;
        let response = await request(app).post(v + '/classes/')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(topic);
        expect(response.status).toBe(500);
        done();
    });

    test('Bad request - payload is null', async (done) => {
        let response = await request(app).post(v + '/classes/').send(null)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(500);
        expect(response.status).toBe(500);
        done();
    });

    test('Success - Payload has only title', async (done) => {
        let topic = db.get_topic_obj();
        topic.title = 'API Design';
        let response = await request(app).post(v + '/classes/').send(topic)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        expect(response.body.id).toBe(db.classes.length - 1);
        expect(response.body.title).toBe(topic.title);
        done();
    });

    test('Success - id attribute in payload is ignored', async (done) => {
        let topic = db.get_topic_obj();
        topic.title = 'API Design';
        topic.id = 'Ignore me';
        let response = await request(app).post(v + '/classes/').send(topic)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        expect(response.body.id).toBe(db.classes.length - 1);
        expect(response.body.title).toBe(topic.title);
        done();
    });
});

describe('Test GET classes/:id', () => {

    test('Bad request with non-number id', async (done) => {
        let id = '123abc';
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(401);
        done();
    });

    test('Bad request with negative id', async (done) => {
        let id = -12;
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(401);
        done();
    });

    test('Not found', async (done) => {
        // Big enough to be out of array
        let id = 50000;
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(404);
        done();
    });

    test('Not found because deleted', async (done) => {
        let id;
        let f = db.classes.forEach((element, index, arr) => {
            if (element == undefined) {
                id = index;
            }
        });
        if (id != undefined) {
            let response = await request(app).get(v + '/classes/' + id);
            expect(response.status).toBe(404);
        }
        done();
    });

    test('Success', async (done) => {
        let id = '1';
        let topic = db.get_topic_obj();
        topic.id = 1;
        topic.title = 'Github';
        db.classes[1] = topic;
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.id).toBe(1);
        expect(response.body.title).toBe('Github');
        done();
    });

});*/