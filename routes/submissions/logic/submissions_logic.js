const db = require('../../../db/db.js');
const _ = require('lodash');

function validation_create_submission(submission) {
    if (submission && Number.isInteger(submission.examId) && Number.isInteger(submission.userId) && Number.isInteger(submission.taskId) && typeof submission.response === 'string') {
        if (_.find(db.exams, function (o) { return submission.examId == o.id })
            && _.find(db.exams, function (o) { return submission.userId == o.id })
            && _.find(db.exams, function (o) { return submission.taskId == o.id })) {
            return true;
        }
        else
            return false
    }
    else
        return false;
}

function submission_create(submission) {
    if (validation_create_submission(submission)) {
        submission.id = db.submissions.length;
        db.submissions.push(submission);
        return submission;
    }
    else {
        throw 'Bad Request';
    }
}

function submission_get_by_id(id) {
    if (Number.isInteger(id)) {
        if (db.submissions[id] !== null && db.submissions[id] !== undefined) {
            return db.submissions[id];
        }
        else
            throw 'Not Found'
    }
    else {
        throw 'Not Found'
    }
}

function sumbission_get_all(examId, userId, taskId) {
    //return array of submissions
}

function submission_edit(submission) {
    return false;
}


module.exports = { validation_create_submission, submission_create, submission_get_by_id };

