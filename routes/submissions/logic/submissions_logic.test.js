const submission_logic = require('./submissions_logic.js');
const db = require('../../../db/db.js');

db.exams.push({ id: 0 })
db.users.push({ id: 0 })
db.tasks.push({ id: 0 })
db.tasks.push({ id: 1 })

describe('Test create submissions', () => {
    test('validation_create_submission', () => {
        let submission = { exam: 0, user: 0, task: 0, response: "response" };
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

        let submission = { exam: 0, user: 0, task: 0, response: "response" };
        let added = submission_logic.submission_create(submission);

        expect(typeof (added)).toBe('object');
        expect(added.id).toBe(db.submissions.length - 1);

        db.submissions.pop();
    });
});

describe('Test Retrieve a submission', () => {
    test('Retrieve a submission that not exits or by wrong value', () => {
        function getnull() {
            return submission_logic.submission_get_by_id(null)
        }
        expect(getnull).toThrow('Bad Request');

        function getnotint() {
            expect(submission_logic.submission_get_by_id('ciao')).toThrow();
        }
        expect(getnotint).toThrow('Bad Request');

        function getintnotvalue() {
            expect(submission_logic.submission_get_by_id(-23)).toThrow();
        }
        expect(getintnotvalue).toThrow('Not Found');

    });

    test('Retrieve a submission that exits', () => {

        db.submissions.push({ id: 0, exam: 0, user: 0, task: 1, response: "ciao" })

        let result = submission_logic.submission_get_by_id(0);
        expect(result.id).toBe(0);
        expect(result.exam).toBe(0);
        expect(result.user).toBe(0);
        expect(result.response).toBe("ciao");
    });
});

describe('Test delete submission', () => {
    //Error
    test('wrong value to delete a submission', () => {
        expect(() => { submission_logic.sumbission_delete(null) }).toThrow('Bad Request');

        expect(() => { submission_logic.sumbission_delete('ciao') }).toThrow('Bad Request');
    })

    test('Delete a submission that not exists', () => {
        expect(submission_logic.sumbission_delete(-2)).toBe(false);

        expect(submission_logic.sumbission_delete(123)).toBe(false);
    })

    //Not Error
    test('Correct delete of a submission', () => {
        expect(submission_logic.sumbission_delete(0)).toBe(true);

        db.submissions.pop();
    })
});

describe('Test Get all submissions', () => {
    //Error
    test('Get all with wrong parameters', () => {
        expect(() => { submission_logic.sumbission_get_all(null) }).toThrow('Bad Request');
        expect(() => { submission_logic.sumbission_get_all(0) }).toThrow('Bad Request');
        expect(() => { submission_logic.sumbission_get_all('ciao', 0, 0) }).toThrow('Bad Request');
        expect(() => { submission_logic.sumbission_get_all(0, 0, 'ciao') }).toThrow('Bad Request');
    })

    test('Get all with invalid references', () => {
        expect(submission_logic.sumbission_get_all(123, 0)).toEqual([]);
        
    })

    //Not Error
    test('Get all valid', () => {
        //da finire
        db.submissions.push({ id: 0, user: 0, exam: 0, task: 0, response: 'prova' });
        db.submissions.push({ id: 1, user: 0, exam: 0, task: 1, response: 'ciao' });
        expect(submission_logic.sumbission_get_all(0, 0, undefined)).toEqual([{ id: 0, user: 0, exam: 0, task: 0, response: 'prova' }, { id: 1, user: 0, exam: 0, task: 1, response: 'ciao' }]);
        expect(submission_logic.sumbission_get_all(0, 0, 0)).toEqual([{ id: 0, user: 0, exam: 0, task: 0, response: 'prova' }]);
        expect((submission_logic.sumbission_get_all(0, 0, 0, 0))).toEqual([{ id: 0, user: 0, exam: 0, task: 0, response: 'prova' }]);
    })
});