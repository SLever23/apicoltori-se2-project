const db = require('../../../db/db.js');
const _ = require('lodash');

module.exports = {
    reviews_get_all : (examId, userId, taskId) => {
        if(examId == null || userId == null || isNaN(examId) || isNaN(userId)){
            throw 'Invalid input';
        }
        let results = [];
        let g = db.reviews.forEach(element => {
            if(element.exam == examId && element.user == userId){
                results.push(element);
            }
        });
        
        if((taskId != null)){
            if(isNaN(taskId)){
                throw 'Invalid input';
            }
            let h = results.forEach(element => {
                if(element.task != taskId){
                    results.pop(element);
                }
            });
        }
        return results;
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
function validate_create(review){
    let result = true;
    if(review == null ||
        ((review.examId == null) && (review.userId == null) && (review.taskId == null)) ||
        ((review.examId instanceof String) && (review.userId instanceof String) && (review.taskId instanceof String))){
        result = false;
    }
    return result;
}