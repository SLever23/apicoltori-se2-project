const db = require('../../../db/db.js');
const _ = require('lodash');
const moment = require('moment');

var formats = [
    moment.ISO_8601,
    "DD/MM/YYYY  :)  HH*mm*ss"
];

var valid_task_pool = (task_pool) => {
    if (task_pool.some((v) => { !Integer.isInteger(v.id_topic) || v.id_topic < 0 }))
        return false;

    if (task_pool.some((v) => { db.topics[v.id_topic] == undefined }))
        return false;

    return true;
}

var validate_create = (exam) => {
    // 'exam != null' checks for both null and undefined
    if (exam == null) throw 'Delivery deadline not valid'

    if ((typeof exam.title) != 'string' && !(exam.title instanceof String) ||
        exam.title.length <= 0)
        throw 'Title not valid'

    if ((typeof exam.deadline_delivery) != 'string' && !(exam.deadline_delivery instanceof String) ||
        exam.deadline_delivery.length <= 0 || !moment(exam.deadline_delivery, formats, true).isValid())
        throw 'Delivery deadline not valid'
        
    if ((typeof exam.deadline_review) != 'string' && !(exam.deadline_review instanceof String) ||
        exam.deadline_review.length <= 0 || !moment(exam.deadline_review, formats, true).isValid())
        throw 'Review deadline not valid'

    if ((typeof exam.start_date) != 'string' && !(exam.start_date instanceof String) ||
        exam.start_date.length <= 0 || !moment(exam.start_date, formats, true).isValid())
        throw 'Start date not valid'

    if ((typeof exam.type) != 'string' && !(exam.type instanceof String) ||
        exam.type.length <= 0 || (exam.type !== 'Exam' && exam.type !== 'Crowdsourcing'))
        throw 'Exam type not valid'

    if (exam.class != null) {
        if (isNaN(exam.class) || !Number.isInteger(exam.class) || exam.class < 0 || db.classes[exam.class] == undefined) {
            throw 'Class not found or id invalid';
        }
    }

    if (exam.collaborators != null) {
        if (exam.collaborators.some((v) => { return (isNaN(v) || !Number.isInteger(v) || v < 0 || db.users[v] == undefined) })) {
            throw 'Collaborators not found or id invalid';
        }
    }

    if (exam.task_pool != null) {
        if (exam.task_pool.some((v) => { return (!Number.isInteger(v.id_topic) || v.id_topic < 0) })) {
            throw 'Invalid topic id in task pool';
        }
        if (exam.task_pool.some((v) => { return db.topics[v.id_topic] == undefined })) {
            throw 'Topic in task pool not found';
        }
        if (exam.task_pool.some((v) => { return (isNaN(v.quantity) || !Number.isInteger(v.quantity) || v.quantity < 0 ) })) {
            throw 'Quantities for task pool invalid';
        }
    }
    
    if (exam.compulsory_tasks != null) {
        if (exam.compulsory_tasks.some((v) => { return (!Number.isInteger(v) || v < 0) })) {
            throw 'Invalid task id in compulsory tasks';
        }

        if (exam.compulsory_tasks.some((v) => { return (db.tasks[v] == undefined) })) {
            throw 'Task in compulsory tasks not found';
        }
    }

    return true;
}

module.exports = {
    /**
     * Adds a topic to the topics collection in db and returns the topic with its id set
     */
    add_exam: (exam) => {
        if (validate_create(exam)) {
            var new_index = db.exams.length;
            exam.id = new_index;
            db.exams.push(exam);
            return _.cloneDeep(exam);
        } else {
            throw 'Invalid exam';
        }
    },

    /**
     * Retrieves a topic from the topics collection in db
     */
    get_by_id: (id) => {
        if (id !== parseInt(id, 10)) {
            throw 'Id not an integer';
        } else if (id < 0) {
            throw 'Id not positive';
        } else {
            return db.exams[id];
        }
    },


}