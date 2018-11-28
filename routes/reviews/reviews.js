const db = require('../../db/db.js');
const logic = require('./logic/reviews_logic.js');

module.exports = {
    reviews_post: (req, res) => {
        let review = req.body;
        //console.log(review.id +" "+ review.exam + " "+ review.user + " "+ review.task + " "+ review.response);
        try {
            review = logic.reviews_create(review);
            res.status(200).json(review);
        } catch (e) {
            res.status(400).send(e);
        }
    },

    reviews_get: (req, res) => {
        db.reviews[2] = {id: 2,exam: 2, user: 2, task: 2};
        db.exams[2] = {id: 2};
        db.users[2] = {id: 2};
        db.tasks[2] = {id: 2};

        try {
            let examId = req.query.exam;
            let userId = req.query.user;
            let taskId = req.query.task;
            
            let reviews = logic.reviews_get_all(examId, userId, taskId);
            
            if(reviews.length == 0) {
                res.status(404).send('Not found');
            } else {
                res.status(200).json(reviews);
            }
        } catch (e) {
            res.status(400).send(e);
        }
    },

    reviews_id_put: (req, res) => {
        res.status(501).send('Coming soon!');
    },

    reviews_id_get: (req, res) => {
        res.status(501).send('Coming soon!');
    }, 

    reviews_id_delete: (req, res) => {
        res.status(501).send('Coming soon!');
    }
}