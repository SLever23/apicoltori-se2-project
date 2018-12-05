const logic = require('./logic/exams_logic.js');

module.exports = {
    exams_post: (req, res) => {
        
        let query_len = Object.entries(req.query).length;
        if (query_len > 0) {
            res.status(400).send('query params must be empty');
        } else {
            try {
                let exam = logic.add_exam(req.body);
                res.status(201).send(exam);
            } catch (e) {
                res.status(400).send(e);
            }
        }
    },

    exams_get: (req, res) => {
        res.status(501).send('Coming soon!');
    },

    exams_id_put: (req, res) => {
        res.status(501).send('Coming soon!');
    },

    exams_id_get: (req, res) => {
        let query_len = Object.entries(req.query).length;
        if (Object.entries(req.body).length !== 0) {
            res.status(400).send('Request body must be empty');
        } else if (query_len > 1 || (query_len == 1 && typeof req.query.user === 'undefined')) {
            res.status(400).send('Unnecessary query parameters specified');
        } else {
            if (req.query.user != null) {   // Student mode
                res.status(501).send('Coming soon!');
            } else {
                try {
                    let exam = logic.get_by_id(parseInt(req.params.id));
                    if (exam == undefined) {
                        res.status(404).send('Not found');
                    } else {
                        res.status(200).send(exam);
                    }
                } catch (e) {
                    res.status(400).send(e);
                }
            }
        }
    },

    exams_id_delete: (req, res) => {
        res.status(501).send('Coming soon!');
    }
}