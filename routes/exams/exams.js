const logic = require('./logic/exams_logic.js');

module.exports = {
    exams_post: (req, res) => {
        res.status(501).send('Coming soon!');
    },

    exams_get: (req, res) => {
        res.status(501).send('Coming soon!');
    },

    exams_id_put: (req, res) => {
        res.status(501).send('Coming soon!');
    },

    exams_id_get: (req, res) => {
        /*
        if (req.body.entries.length != 0) {
            res.status(400).send('No body necessary');
        }
        if (req.query.entries.length > 1) {
            res.status(400).send('Too many query parameters, only user required');
        }
        */
        if (req.query.user != null) {   // Student mode
            res.status(501).send('Coming soon!');
        } else {
            try {
                let exam = logic.get_by_id(req.param.id);
                if (exam == undefined) {
                    res.status(404).send('Not found');
                } else {
                    res.status(200).send(exam);
                }
            } catch (e) {
                res.status(400).send(e);
            }
        }
        
    }, 

    exams_id_delete: (req, res) => {
        res.status(501).send('Coming soon!');
    }
}