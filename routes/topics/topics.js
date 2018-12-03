const db = require('../../db/db.js');
const logic = require('./logic/topics_logic.js');

module.exports = {
    topics_post: (req, res) => {
        var topic = req.body;
        try {
            topic = logic.add_topic(topic);
            res.status(200).json(topic);
        } catch (e) {
            res.status(400).send(e);
        }
    },

    topics_get: (req, res) => {
        if (Object.entries(req.body).length !== 0) {
            res.status(400).send('Request body must be empty');
        } else if (Object.entries(req.query).length !== 0) {
            res.status(400).send('Unnecessary query parameters specified');
        } else {
            let topics = logic.get_all_topics();
            res.status(200).json(topics);
        }
    },

    topics_id_put: (req, res) => {
        res.status(501).send('Coming soon!');
    },

    topics_id_get: (req, res) => {
        try {
            var id = req.params.id;
            var topic = logic.get_topic_by_id(id);
            if (typeof topic == 'undefined') {
                res.status(404).send('Not found');
            } else {
                res.status(200).json(topic);
            }
        } catch (e) {
            res.status(400).send(e);
        }
    }, 

    topics_id_delete: (req, res) => {
        res.status(501).send('Coming soon!');
    }
}