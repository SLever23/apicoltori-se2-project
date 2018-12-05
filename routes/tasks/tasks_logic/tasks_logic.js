const db = require('../../../db/db.js');
const _ = require('lodash');

module.exports = {
    add_task: (task) => {
        if (module.exports.validate_create(task)) {
            let new_index = db.tasks.length
            task.id = new_index;
            db.tasks.push(task);
            return task;
        } else {
            throw { status: 400, text: 'Invalid task' };
        }
    },
    get_tasks: (searchkey) => {
        if (searchkey != null && searchkey != undefined && (typeof searchkey) === 'string')
            return db.tasks.filter((element) => { return element.title.includes(searchkey) || element.description.includes(searchkey); });
        else
            return [];
    },
    get_task_by_id: (id) => {
        if (id == null || id == undefined || isNaN(id) || !isFinite(id) || id < 0)
            throw { status: 400, text: 'id not valid' };
        else if (db.tasks[id] == undefined)
            throw { status: 404, text: "task doesn't exist" };
        else
            return db.tasks[id];
    },
    update_task: (task, id) => {
        if (id != null && isFinite(id) && id >= 0)
            if (db.tasks[id] != null && db.tasks[id] != undefined)
                if (module.exports.validate_update(task)) {
                    task.id = parseInt(id);
                    db.tasks[id] = task;
                }
                else
                    throw { status: 400, text: 'invalid task' };
            else
                throw { status: 404, text: 'task not found' };
        else
            throw { status: 400, text: 'invalid id' };
    },
    delete_task: (id) => {
        if (isNaN(id) || id < 0)
            throw { status: 400, text: 'id not valid' };
        else {
            let elem = db.tasks.find((element) => { return (element != null && element != undefined && element.id == id) });
            if (elem == undefined)
                throw { status: 404, text: 'not existing element' };
            db.tasks[id] = undefined;
        }
    },

    validate_create: (task) => {
        if (task == null || task == undefined || task.title == null || task.title == undefined || task.description == null || task.description == undefined || task.type == null || task.type == undefined)
            return false;
        else if (task.title.length > 0 && task.description.length > 0 && task.type.length > 0)
            return true;
        else
            return false;
    },
    validate_update: (task) => {
        if (task == null || task == undefined || task.title == null || task.title == undefined || task.description == null || task.description == undefined || task.type == null || task.type == undefined)
            return false;
        else if (task.title.length > 0 && task.description.length > 0 && task.type.length > 0)
            return true;
        else
            return false;
    }
}
