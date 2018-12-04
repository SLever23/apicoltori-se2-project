const logic = require('./tasks_logic/tasks_logic.js');

module.exports = {
    tasks_post: (req, res) => {
        try {
            let task = logic.add_task(req.body);
            res.status(201).json(task);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    tasks_get: (req, res) => {
        try {
            let tasks = logic.get_tasks(req.query.searchkey);
            res.status(200).json(tasks);
        } catch (e) {
            res.status(400).send(e);
        }
    },

    tasks_id_put: (req, res) => {
        try {
            logic.update_task(req.body, req.params.id);
            res.status(204).send();
        } catch (e) {
            res.status(500).send(e);
        }
    },

    tasks_id_get: (req, res) => {
        try {
            let task = logic.get_task_by_id(req.params.id);
            res.status(200).json(task);
        } catch (e) {
            res.status(404).send(e)
        }
    },

    tasks_id_delete: (req, res) => {
        try {
            logic.delete_task(req.params.id);
            res.status(204).send();
        } catch (e) {
            res.status(404).send();
        }
    }
}