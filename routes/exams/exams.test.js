const db = require('../../db/db.js');
const fetch = require('node-fetch');

const supertest = require('supertest');
const api = require('../../api.js');
const app = api.app;

const v = '/v1';

var get_valid_exam = () => {
    db.classes[1] = { id: 1 };
    db.users[1] = { id: 1 };
    db.users[2] = { id: 2 };
    db.tasks[1] = { id: 1 };
    db.tasks[2] = { id: 2 };
    db.tasks[4] = { id: 4 };
    db.topics[2] = { id: 2 };
    db.topics[5] = { id: 5 };
    let exam = db.get_exam_obj();
    exam.title = 'Software Engineering 2';
    exam.type = 'Exam';
    exam.class = 1;
    exam.deadline_delivery = '2019-06-22T12:00:00+0000';
    exam.deadline_review = '2019-06-25T13:00:00+0000';
    exam.start_date = '2015-06-20T12:00:00+0000';
    exam.collaborators = [1, 2];
    exam.compulsory_tasks[1, 2, 4];
    exam.task_pool = [{ id_topic: 2, quantity: 2 },
    { id_topic: 5, quantity: 3 }];
    return exam;
}

var get_valid_taskpool_entry = () => {
    db.topics[1] = { id : 1 };
    return {
        id_topic : 1,
        quantity : 2 
    }
}

describe('Test GET exams/:id with wrong parameter number', () => {
    test('Get status 400 with query param other than user', async (done) => {
        let response = await supertest(app).get(v + '/exams/1?student=1');
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 with more than one query param', async (done) => {
        let response = await supertest(app).get(v + '/exams/1?student=1&user=2');
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 with body not empty', async (done) => {
        let response = await supertest(app).get(v + '/exams/1?student=1&user=2').send('Not empty');
        expect(response.status).toBe(400);
        done();
    });
});

describe('Test GET exams/:id in teacher mode', () => {

    test('Test with existing id', async (done) => {
        let exam = get_valid_exam();
        exam.id = 1;
        db.exams[1] = exam;
        let response = await supertest(app).get(v + '/exams/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(exam);
        done();
    });

    test('Test with non-existing id', async (done) => {
        let response = await supertest(app).get(v + '/exams/1000');
        expect(response.status).toBe(404);
        done();
    });

    test('Test with id not positive', async (done) => {
        let response = await supertest(app).get(v + '/exams/-1');
        expect(response.status).toBe(400);
        done();
    });

    test('Test with id not integer', async (done) => {
        let response = await supertest(app).get(v + '/exams/not%20an%20int');
        expect(response.status).toBe(400);
        done();
    });

});

describe('Test GET exams/:id in student mode', () => {
    test('Not yet implemented', async (done) => {
        let response = await supertest(app).get(v + '/exams/not%20an%20int');
        expect(response.status).toBe(400);
        done();
    });
});

describe('Test POST /exams with wrong parameter number',  () => {

    test('Get status 400 with query param', async (done) => {
        let exam = get_valid_exam();
        let response = await supertest(app).post(v + '/exams?user=2')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

});

describe('Test POST exams/', () => {
    test('Get status 201 posting valid exam', async (done) => {
        let exam = get_valid_exam();
        console.table(exam);
        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(db.exams[db.exams.length-1]);
        done();
    });

    test('Get status 400 adding invalid exam - No title', async (done) => {
        let exam = get_valid_exam();
        exam.title = null;
        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Title not string', async (done) => {
        let exam = get_valid_exam();
        exam.title = 1;
        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - No delivery deadline', async (done) => {
        let exam = get_valid_exam();
        exam.deadline_delivery = null;
        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Bad format delivery deadline', async (done) => {
        let exam = get_valid_exam();
        exam.deadline_delivery = 'Definetly not a valid date';
        let response = await supertest(app).post(v + '/exams')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send(exam);
    expect(response.status).toBe(400);
    done();
    });

    test('Get status 400 adding invalid exam - delivery deadline not string', async (done) => {
        let exam = get_valid_exam();
        exam.deadline_delivery = { item: 'What is this' };
        let response = await supertest(app).post(v + '/exams')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send(exam);
    expect(response.status).toBe(400);
    done();
    });

    test('Get status 400 adding invalid exam - No review deadline', async (done) => {
        let exam = get_valid_exam();
        exam.deadline_review = null;

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - invalid review deadline', async (done) => {
        let exam = get_valid_exam();
        exam.deadline_review = 'Definetly not a valid date';

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - review deadline not a string', async (done) => {
        let exam = get_valid_exam();
        exam.deadline_review = ['So much not a string'];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - No start date', async (done) => {
        let exam = get_valid_exam();
        exam.start_date = null;

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - invalid start date', async (done) => {
        let exam = get_valid_exam();
        exam.start_date = 'Definetly not a valid date';

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - start date not a string', async (done) => {
        let exam = get_valid_exam();
        exam.start_date = ['So much not a string'];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - No type', async (done) => {
        let exam = get_valid_exam();
        exam.type = null;

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - invalid type', async (done) => {
        let exam = get_valid_exam();
        exam.type = 'Neither crowdsourcing nor exam';

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - type not a string', async (done) => {
        let exam = get_valid_exam();
        exam.type = ['So much not a string'];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Class id not positive integer', async (done) => {
        let exam = get_valid_exam();
        exam.class = -1;

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Class id does not match any class', async (done) => {
        let exam = get_valid_exam();
        exam.class = 1000;

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });
    // Split cases where id is string and negative integer
    test('Get status 400 adding invalid exam - collaborator ids not positive integer', async (done) => {
        let exam = get_valid_exam();
        exam.collaborators = ["Not a positive integer", -1, "1"];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Collaborator ids do not match any users', async (done) => {
        let exam = get_valid_exam();
        exam.collaborators = [1000];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Compulsory tasks ids not integer', async (done) => {
        let exam = get_valid_exam();
        exam.compulsory_tasks = ['So much not a positive integer', -1];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Compulsory tasks ids do not match any tasks', async (done) => {
        let exam = get_valid_exam();
        exam.compulsory_tasks = [1000];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Task pool not array of required objects', async (done) => {
        let exam = get_valid_exam();
        exam.task_pool = [{ wtf: 'hello' }];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Topic ids in task pool not positive integers', async (done) => {
        let exam = get_valid_exam();
        let entry = get_valid_taskpool_entry();
        entry.id_topic = -1;
        let entry2 = get_valid_taskpool_entry();
        entry2.id_topic = '123';
        exam.task_pool = [entry, entry2];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Quantities in task pool not positive integers', async (done) => {
        let exam = get_valid_exam();
        let entry = get_valid_taskpool_entry();
        entry.quantity = -1;
        let entry2 = get_valid_taskpool_entry();
        entry2.quantity = 3.14;
        exam.task_pool = [entry, entry2];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

    test('Get status 400 adding invalid exam - Topic ids in task pool do not match any topics', async (done) => {
        let exam = get_valid_exam();
        let entry = get_valid_taskpool_entry();
        entry.id_topic = 1000;
        exam.task_pool = [entry];

        let response = await supertest(app).post(v + '/exams')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').send(exam);
        expect(response.status).toBe(400);
        done();
    });

});
