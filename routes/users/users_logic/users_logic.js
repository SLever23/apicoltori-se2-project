const db = require('../../../db/db.js');

const _ = require('lodash');



module.exports = {

    
    
    get_user: (email) => {

        if(module.exports.validate_email(email)) {

            if(db.users[email] == null) {

                throw 'No matching user';

            } else {

                return db.users[email];

            }

        } else {

            throw 'Bad syntax on email field';

        }
        
    },
    
    
    
    add_user: (user) => {

        if (module.exports.validate_create(user)) {

            var new_index = db.users.length;
            user.id = new_index;
            db.users.push(user);

            return _.cloneDeep(user);

        } else {

            throw 'Invalid user';

        }

    },





    get_user_by_id: (id) => {

        if (module.exports.validate_id(id)) {

            return db.users[id];
            

        } else {

            throw 'Invalid id';

        }

    },

    



    validate_create: (user) => {

        var valid_name = new RegExp(/^[A-Z][a-z]+$/);


        if ((user == null) || !(valid_name.test(user.name)) || !(valid_name.test(user.surname)) || !(module.exports.validate_email(user.email)) || (typeof user.password != 'string')) {

            return false;

        } else {

            return true;

        }

    },



    validate_email: (email) => {

        var valid_email = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);

        if(valid_email.test(email)) {

            return true;

        } else {

            return false;

        }

    },



    validate_id: (id) => {

        if(isNaN(id) || id < 0) {

            return false;

        } else {

            return true;

        }

    },



}