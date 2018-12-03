const submission_logic = require('./logic/submissions_logic.js');
const db = require('../../db/db.js');

module.exports = {
    submissions_post: (req, res) => {
        try {
            //db.exams.push({id: 0});
            //db.users.push({id: 0});
            //db.tasks.push({id: 0});
            let submission = submission_logic.submission_create(req.body);
            res.status(201).json(submission);
        } catch (error) {
            if (error === 'Bad Request')
                res.sendStatus(400);
            else
                res.sendStatus(500);
        }
    },

    submissions_get: (req, res) => {
        res.status(501).send('Coming soon!');
    },

    submissions_id_put: (req, res) => {
        res.status(501).send('Coming soon!');
    },

    submissions_id_get: (req, res) => {
        try {
            let submission = submission_logic.submission_get_by_id(req.params.id);
            res.status(200).json(submission);
        } catch (error) {
            if (error === 'Not Found') {
                res.sendStatus(404);
            }
            else if (error === 'Bad Request') {
                res.sendStatus(400);
            }
            else
                res.sendStatus(500);
        }
    },

    submissions_id_delete: (req, res) => {
        res.status(501).send('Coming soon!');
    }
}