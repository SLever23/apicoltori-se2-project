const submission_logic = require('./submissions_logic.js');
const db = require('../../../db/db.js');

test('validation_create_submission', () => {
    db.exams.push({ id: 0 })
    db.users.push({ id: 0 })
    db.tasks.push({ id: 0 })

    let submission = { examId: 0, userId: 0, taskId: 0, response: "response" };

    expect(submission_logic.validation_create_submission(submission)).toBe(true);
});

test('Add invalid submissions', () => {
    function addnull() {
        return submission_logic.submission_create(null);
    }
    expect(addnull).toThrow();

    function addstring() {
        return submission_logic.submission_create("prova");
    }
    expect(addstring).toThrow();

    function addinvalidint() {
        let submission = { exam: "null", user: "ciao", task: "n", response: "cc" }
        return submission_logic.submission_create(submission)
    }
    expect(addinvalidint).toThrow();

    function addinvalidstring() {
        let submission = { exam: 0, user: 0, task: 0, response: 32 }
        return submission_logic.submission_create(submission)
    }
    expect(addinvalidstring).toThrow();
});

test('Add submissions with invalid reference ', () => {
    db.exams.push({ id: 0 })
    db.users.push({ id: 0 })
    db.tasks.push({ id: 0 })

    function addwrongexam() {
        let submission = { exam: 222, user: 0, task: 0, response: "ciao" }
        return submission_logic.submission_create(submission);
    }
    expect(addwrongexam).toThrow();

    function addwronguser() {
        let submission = { exam: 0, user: 222, task: 0, response: "ciao" }
        return submission_logic.submission_create(submission);
    }
    expect(addwronguser).toThrow();

    function addwrongtask() {
        let submission = { exam: 0, user: 0, task: 222, response: "ciao" }
        return submission_logic.submission_create(submission);
    }
    expect(addwrongtask).toThrow();
});

test('Add valid submission ', () => {
    db.exams.push({ id: 0 })
    db.users.push({ id: 0 })
    db.tasks.push({ id: 0 })

    let submission = { examId: 0, userId: 0, taskId: 0, response: "response" };
    let added = submission_logic.submission_create(submission);

    expect(typeof (added)).toBe('object');
    expect(added.id).toBe(db.submissions.length - 1);
});

test('Retrieve a submission that not exits or by wrong value', () => {
    function getnull() {
        return submission_logic.submission_get_by_id(null)
    }
    expect(getnull).toThrow();

    function getnotint() {
        expect(submission_logic.submission_get_by_id('22')).toThrow();
    }
    expect(getnotint).toThrow();

    function getintnotvalue() {
        expect(submission_logic.submission_get_by_id(-23)).toThrow();
    }
    expect(getintnotvalue).toThrow();

});

test('Retrieve a submission that exits', () => {

    db.submissions[0]={ id: 0, exam: 0, user: 0, task: 0, response: "ciao" };

    let result = submission_logic.submission_get_by_id(0);
    expect(result.id).toBe(0);
    expect(result.exam).toBe(0);
    expect(result.user).toBe(0);
    expect(result.response).toBe("ciao");

    db.submissions.push({ id: 1, exam: 0, user: 0, task: 0, response: "ciao" })

    result = submission_logic.submission_get_by_id(1);
    expect(result.id).toBe(db.submissions.length - 1);
    expect(result.exam).toBe(0);
    expect(result.user).toBe(0);
    expect(result.response).toBe("ciao");
});