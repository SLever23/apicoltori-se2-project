const db = require('../../../db/db.js');
const _ = require('lodash');

module.exports = {
    sumbission_get_all : (examId, userId, taskId) => {
        //return array of submissions
    },

    submission_create: (submission) => {
        return submission;
    },

    submission_get_by_id : (id) => {
        //return submission;
    },
    
    submission_edit: (submission) => {
        return false;
    }
}