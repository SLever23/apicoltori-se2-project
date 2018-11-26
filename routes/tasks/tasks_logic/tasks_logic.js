const db = require('../../../db/db.js');
const _ = require('lodash');

module.exports = {
    add_task: (task) => {
        if (validate_create(task)) {
            let new_index = db.tasks.length
            task.id = new_index;
            db.tasks.push(task);
            return topic;
        } else {
            throw 'Invalid task';
        }
    },
    get_tasks: (searchkey) => {
        //return task with the matching title, description, topic, type
    },
    get_task_by_id: (id) => {
        if(isNaN(id) || id < 0)
            throw 'id not valid';
        else
            return db.tasks[id];
    },
    update_task: (task,id) => {
        if(validate_update(task)){
            db.tasks[id] = task; //da rivedere, non credo che funzioni
        }
        else
            throw 'invalid task';
    },
    delete_task: (id) => {
    if(isNaN(id) || id < 0)
        throw 'id not valid';
    else;
        //da rivedere, se lo elimino nel modo classico succede un disastro con gli id
    }
}

validate_create: (task) => {//da finire
    if(task == null || task == undefined)
        return false;
    else
        return true;
}

validate_update: (task) => {// da finire
    if(task == null || task == undefined)
        return false;
    else
        return true;
}