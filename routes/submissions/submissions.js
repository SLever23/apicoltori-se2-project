const submission_logic = require('./logic/submissions_logic.js');
const db = require('../../db/db.js');

module.exports = {
    submissions_post: (req, res) => {
        try {
            //db.exams.push({id: 0});
            //db.users.push({id: 0});
            //db.tasks.push({id: 0});
            //console.log(typeof req.body.exam); type number if correct
            let submission = submission_logic.submission_create(req.body);
            res.status(201).json(submission);
        } catch (error) {
            if (error === 'Bad Request')
                res.sendStatus(400);
        }
    },

    submissions_get: (req, res) => {
        let user = req.query.user;
        let exam = req.query.exam;
        let task = req.query.task;

        try {
            let result = submission_logic.sumbission_get_all(user, exam, task);
            res.status(200).json(result);
        }
        catch (error) {
            if(error=='Bad Request')
            {
                res.sendStatus(400);
            }
        }
    },

    /*submissions_id_put: (req, res) => {
        res.status(501).send('Coming soon!');
    },*/

    submissions_id_get: (req, res) => {
        try {
            //console.log(typeof req.params.id); type string if correct
            let submission = submission_logic.submission_get_by_id(req.params.id);
            res.status(200).json(submission);
        } catch (error) {
            if (error === 'Not Found')
                res.sendStatus(404);
            else if (error === 'Bad Request')
                res.sendStatus(400);
        }
    },

    submissions_id_delete: (req, res) => {
        try {
            if (submission_logic.sumbission_delete(req.params.id))
                res.sendStatus(204);
            else
                res.sendStatus(404);
        } catch (error) {
            if (error === 'Bad Request')
                res.sendStatus(400);
        }
    }
}