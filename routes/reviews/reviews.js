const db = require('../../db/db.js');
const logic = require('./logic/reviews_logic.js');

db.exams.push({id: 1});
db.users.push({id: 1});
db.tasks.push({id: 1});
db.exams.push({id: 2});
db.users.push({id: 2});
db.tasks.push({id: 2});

module.exports = {
    reviews_post: (req, res) => {
        let review = req.body;

        try {
            review = logic.reviews_create(review);
            res.status(201).json(review);
        } catch (e) {
            if (e === 'Bad Request')
                res.sendStatus(400);
        }
    },

    reviews_get: (req, res) => {
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
        try {
            let reviewId = req.params.id;
            let review = logic.review_get_by_id(reviewId);
            res.status(200).json(review);
        } catch (e) {
            if (e === 'Not Found') {
                res.sendStatus(404);
            }
            else if (e === 'Bad Request') {
                res.sendStatus(400);
            }
        }
        
    }, 

    reviews_id_delete: (req, res) => {
        res.status(501).send('Coming soon!');
    }
}