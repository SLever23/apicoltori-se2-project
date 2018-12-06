const users = require('./users.js');

const api = require('../../api.js');

const request = require('supertest');

const db = require('../../db/db.js');

const app = api.app;

var server;

const v = '/v1';



describe('Test POST users/', () => {

    test('Bad request - user is null', async (done) => {

        let user = db.get_user_obj();

        let response = await request(app).post(v + '/users/').set('Content-Type', 'application/json')

            .set('Accept', 'application/json').send(user);

        expect(response.status).toBe(400);

        done();

    });



    test('Bad request - user.name is not string', async (done) => {

        let user = db.get_user_obj();

        user.name = 123;

        let response = await request(app).post(v + '/users/')

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json').send(user);

        expect(response.status).toBe(400);

        done();

    });



    test('Bad request - user.name has numbers in the string', async (done) => {

        let user = db.get_user_obj();

        user.name = 'Tiziano123';

        let response = await request(app).post(v + '/users/')

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json').send(user);

        expect(response.status).toBe(400);

        done();

    });


    test('Bad request - user.surname is not string', async (done) => {

        let user = db.get_user_obj();

        user.surname = 123;

        let response = await request(app).post(v + '/users/')

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json').send(user);

        expect(response.status).toBe(400);

        done();

    });



    test('Bad request - user.surname has numbers in the string', async (done) => {

        let user = db.get_user_obj();

        user.surname = 'Caiano123';

        let response = await request(app).post(v + '/users/')

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json').send(user);

        expect(response.status).toBe(400);

        done();

    });



    test('Bad request - user.email has no dot at the end', async (done) => {

        let user = db.get_user_obj();

        user.email = 'tizio.caio@semprognocom';

        let response = await request(app).post(v + '/users/')

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json').send(user);

        expect(response.status).toBe(400);

        done();

    });


    test('Bad request - user.email has two consecutive dots', async (done) => {

        let user = db.get_user_obj();

        user.email = 'tizio..caio@semprogno.com';

        let response = await request(app).post(v + '/users/')

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json').send(user);

        expect(response.status).toBe(400);

        done();

    });



    test('Bad request - user.email is not an email', async (done) => {

        let user = db.get_user_obj();

        user.email = 'ciaociao';

        let response = await request(app).post(v + '/users/')

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json').send(user);

        expect(response.status).toBe(400);

        done();

    });



    test('Bad request - user.email is not a string ', async (done) => {

        let user = db.get_user_obj();

        user.email = 0;

        let response = await request(app).post(v + '/users/')

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json').send(user);

        expect(response.status).toBe(400);

        done();

    });



    test('Bad request - user.password is not a string', async (done) => {

        let user = db.get_user_obj();

        user.password = 0;

        let response = await request(app).post(v + '/users/')

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json').send(user);

        expect(response.status).toBe(400);

        done();

    });



    test('Success - Correct data', async (done) => {

        let user = db.get_user_obj();

        
        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';

        let response = await request(app).post(v + '/users/').send(user)

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json');

        expect(response.status).toBe(201);

        expect(response.body.id).toBe(db.users.length - 1);

        expect(response.body.name).toBe(user.name);

        done();

    });



    test('Success - id attribute in payload is ignored', async (done) => {

        let user = db.get_user_obj();

        
        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';

        user.id = 'Ignore me';

        let response = await request(app).post(v + '/users/').send(user)

            .set('Content-Type', 'application/json')

            .set('Accept', 'application/json');

        expect(response.status).toBe(201);

        expect(response.body.id).toBe(db.users.length - 1);

        expect(response.body.name).toBe(user.name);

        done();

    });

});



describe('Test GET users/:id', () => {



    test('Bad request with non-number id', async (done) => {

        let id = '123abc';

        let response = await request(app).get(v + '/users/' + id);

        expect(response.status).toBe(400);

        done();

    });


    test('Bad request with negative id', async (done) => {

        let id = -12;

        let response = await request(app).get(v + '/users/' + id);

        expect(response.status).toBe(400);

        done();

    });

    



    test('Not found', async (done) => {

        // Big enough to be out of array

        let id = 50000;

        let response = await request(app).get(v + '/users/' + id);

        expect(response.status).toBe(404);

        done();

    });



    test('Not found because deleted', async (done) => {

        let id;

        let f = db.users.forEach((element, index, arr) => {

            if (element == undefined) {

                id = index;

            }

        });

        if (id != undefined) {

            let response = await request(app).get(v + '/users/' + id);

            expect(response.status).toBe(404);

        }

        done();

    });


    test('Success', async (done) => {

        let id = '1';

        let user = db.get_user_obj();

        user.id = 1;

        user.name = 'Tizio';

        db.users[1] = user;

        let response = await request(app).get(v + '/users/' + id);

        expect(response.status).toBe(200);

        expect(response.type).toBe('application/json');

        expect(response.body.id).toBe(1);

        expect(response.body.name).toBe('Tizio');

        done();

    });

});