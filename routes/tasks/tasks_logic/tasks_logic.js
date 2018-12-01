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
            throw 'Invalid task';
        }
    },
    get_tasks: (searchkey) => {
        if (searchkey != null && searchkey != undefined && (typeof searchkey) === 'string') {
            return db.tasks.find((element) => { return element.title.includes(searchkey) || element.description.includes(searchkey); });
        }
        else
            throw 'invalid searchkey';
    },
    get_task_by_id: (id) => {
        if (isNaN(id) || id < 0)
            throw 'id not valid';
        else if (db.tasks[id] == undefined)
            throw "task doesn't exist";
        else
            return db.tasks[id];
    },
    update_task: (task, id) => {
        if (id != null && isFinite(id) && id >= 0 && db.tasks[id] != null && db.tasks[id] != undefined)
            if (module.exports.validate_update(task)) {
                task.id = id;
                db.tasks[id] = task;
            }
            else
                throw 'invalid task';
        else
            throw 'invalid id';
    },
    delete_task: (id) => {
        if (isNaN(id) || id < 0)
            throw 'id not valid';
        else {
            let elem = db.tasks.find((element) => { return element.id == id });
            if (elem == undefined)
                throw 'task not exist';
            db.tasks.splice(db.tasks.indexOf(elem), id);
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
