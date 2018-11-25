const db = require('../../../db/db.js');
const _ = require('lodash');

module.exports = {
    add_topic: (topic) => {
        return topic;
    },

    get_topic_by_id: (id) => {
        return db.topics[id];
    },
    
    validate_create: (topic) => {
        return false;
    }
}