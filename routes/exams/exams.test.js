const db = require('../../db/db.js');
// const fetch = require('node-fetch');

const supertest = require('supertest');
const api = require('../../api.js');
const app = api.app;
console.log(app);

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
    exam.deadline_delivery = '2019-06-22T12:00:00+0000'; // Format date?
    exam.deadline_review = '2019-06-25T13:00:00+0000';
    exam.start_date = '2015-06-20T12:00:00+0000';
    exam.collaborators = [1, 2];
    exam.compulsory_tasks[1, 2, 4];
    exam.task_pool = [{ id_topic: 2, quantity: 2 },
    { id_topic: 5, quantity: 3 }];
    return exam;
}

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
        let response = await supertest(app).get(v + '/exams/1?user=1');
        expect(response.status).toBe(501);
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
        let response = await supertest(app).get(v + '/exams/1?user=1');
        expect(response.status).toBe(501);
        done();
    });
});

describe('Test POST exams/', () => {

});