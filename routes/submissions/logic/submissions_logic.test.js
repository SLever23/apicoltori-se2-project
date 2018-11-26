const submission_logic = require('./submissions_logic.js');
const db = require('../../../db/db.js');

test('Add invalid submissions', () => {
    expect(submission_logic.submission_create(null)).toThrow();
    
    let submissions = {exam: "null", user: "ciao", task: "n", response: "cc"}
    expect(submission_logic.submission_create(submissions)).toThrow();

    submissions = {exam: 0, user: 0, task: 0, response: 32}
    expect(submission_logic.submission_create(submissions)).toThrow();
});

test('Add submissions with invalid reference ', () => {
    db.exams.push({id: 0})
    db.users.push({id: 0})
    db.tasks.push({id: 0})

    submissions = {exam: 222, user: 0, task: 0, response: "ciao"}
    expect(submission_logic.submission_create(submissions)).toThrow();

    submissions = {exam: 0, user: 222, task: 0, response: "ciao"}
    expect(submission_logic.submission_create(submissions)).toThrow();

    submissions = {exam: 0, user: 0, task: 222, response: "ciao"}
    expect(submission_logic.submission_create(submissions)).toThrow();
});

test('Add valid submission ', () => {
    db.exams.push({id: 0})
    db.users.push({id: 0})
    db.tasks.push({id: 0})

    submissions = {exam: 0, user: 0, task: 0, response: "ciao"}
    let added = submission_logic.submission_create(submissions);

    expect(typeof(added)).toBe('object');
    expect(added.id).toBe(db.submissions.length - 1);
});

test('Retrieve a submission that not exits or by wrong value', () => {
    expect(submission_logic.submission_get_by_id(null)).toThrow();

    expect(submission_logic.submission_get_by_id('22')).toThrow();

    expect(submission_logic.submission_get_by_id(-23)).toThrow();
})

test('Retrieve a submission that exits', () => {
    db.submissions.push({id: 0, exam: 0, user: 0, task: 0, response: "ciao"})
    
    let result = submission_logic.submission_get_by_id(0);
    expect(typeof(result)).toBe('object');
    expect(result.id).toBe(0);

    db.submissions.push({id: 1, exam: 0, user: 0, task: 0, response: "ciao"})

    result = submission_logic.submission_get_by_id(1);
    expect(typeof(result)).toBe('object');
    expect(result.id).toBe(db.submissions.length - 1);
})



