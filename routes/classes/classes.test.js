const classes = require('./classes.js');
const api = require('../../api.js');
const db = require('../../db/db.js');
const app = api.app;
const request = require('supertest');

var server;
const v = '/v1';


describe('Test GET classes/', () => {

    test('Success', async (done) => {
        let clas = [db.get_class_obj(), db.get_class_obj(), db.get_class_obj()];
        for(var i = 0; i < 3; i++) {
            clas[i].name = 'Classe'+i;
            db.classes[i] = clas[i];
        }
        let response = await request(app).get(v + '/classes/');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(clas);
        done();
    });

});

describe('Test POST classes/', () => {
    
    test('Bad request - class is null', async (done) => {
        let clas = db.get_class_obj();
        let response = await request(app).post(v + '/classes/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(clas);
        expect(response.status).toBe(500);
        done();
    });

    test('Bad request - clas.name is not string', async (done) => {
        let clas = db.get_class_obj();
        clas.name = 123;
        let response = await request(app).post(v + '/classes/')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(clas);
        expect(response.status).toBe(500);
        done();
    });

    test('Bad request - clas.students is not string', async (done) => {
        let clas = db.get_class_obj();
        clas.students = 123;
        let response = await request(app).post(v + '/classes/')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(clas);
        expect(response.status).toBe(500);
        done();
    });

    test('Bad request - clas.students is not a nuber string', async (done) => {
        let clas = db.get_class_obj();
        clas.students = ['a', 'b', 'c'];
        let response = await request(app).post(v + '/classes/')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(clas);
        expect(response.status).toBe(500);
        done();
    });

    test('Success', async (done) => {
        let clas = db.get_class_obj();
        clas.name = 'Corso';
        clas.students = [0, 1, 2];
        let response = await request(app).post(v + '/classes/').send(clas)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        expect(response.body.id).toBe(db.classes.length - 1);
        expect(response.body.name).toBe(clas.name);
        done();
    });
});

describe('Test GET classes/:id', () => {

    test('Bad request with non-number id', async (done) => {
        let id = '123abc';
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(404);
        done();
    });

    test('Bad request with negative id', async (done) => {
        let id = -12;
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(404);
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
        let clas = db.get_class_obj();
        clas.id = 1;
        clas.name = 'Corso';
        db.classes[1] = clas;
        let response = await request(app).get(v + '/classes/' + id);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.id).toBe(1);
        expect(response.body.name).toBe('Corso');
        done();
    });

});