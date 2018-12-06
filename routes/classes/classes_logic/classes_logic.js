const db = require('../../../db/db.js');

const _ = require('lodash');




module.exports = {

    
    
    get_class: (exam) => {

        return db.classes
        
    },
    
    
    
    add_class: (clas) => {

        if (module.exports.validate_create(clas)) {

            var new_index = db.classes.length;
            clas.id = new_index;
            db.classes.push(clas);

            return _.cloneDeep(clas);

        } else {

            throw {status: 400, error: 'Invalid class'};

        }

    },





    get_class_by_id: (id) => {

        if (module.exports.validate_id(id)) {

            if (db.classes[id] == null) {
                
              throw {status: 404, error: 'Not existing class'}; 

            } else {

                return db.classes[id];

            }
            

        } else {

            throw {status: 400, error: 'Invalid id'}; 

        }

    },

    



    validate_create: (clas) => {


        if ((clas == null) || (typeof clas.name != 'string') 
            || !(module.exports.validate_array(clas.students))) {

            return false;

        } else {

            return true;

        }

    },

    validate_array: (students) => {

        if (!(Array.isArray(students))) {

            return false;

        }
        else {
            
            var flag = true;
            for(var i =0; i < students.length; i++) {

                if (typeof students[i] != 'number') {

                    flag = false;

                }

            }

            return flag;

        }

    },



    validate_id: (id) => {

        if (isNaN(id) || id < 0) {

            return false;

        } else {

            return true;

        }

    },



}