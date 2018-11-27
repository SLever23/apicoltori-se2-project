const db = require('../../../db/db.js');
const _ = require('lodash');

module.exports = {
    reviews_get_all : (examId, userId, taskId) => {
        let results = [];
        if(input_found(db.exams, examId) && input_found(db.users, userId)){
            results = _.filter(db.reviews, {examId: examId, userId: userId});
            if((taskId != null) && input_found(db.tasks, taskId) ){
                results = _.filter(results, {taskId: taskId});
            }
            return results;
        } else {
            throw new Error ('Not found')
        }
    },
    reviews_create : (review) => {
        if (validate_create(review)) {
            var new_index = db.reviews.length;
            review.id = new_index;
            db.reviews.push(review);
            return review;
        } else {
            throw 'Invalid review';
        }
    }
}

function input_found(db_array, id){
    let result = false;
    if( _.find(db_array, function(o) {return o.id === id})){
        result = true;
    }
    return result;
}
function validate_create(review){
    let result = true;
    if(review == null ||
        ((review.examId == null) && (review.userId == null) && (review.taskId == null)) ||
        ((review.examId instanceof String) && (review.userId instanceof String) && (review.taskId instanceof String))){
        result = false;
    }
    return result;
}