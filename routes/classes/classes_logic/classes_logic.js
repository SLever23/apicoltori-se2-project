const db = require('../../../db/db.js');

const _ = require('lodash');




module.exports = {

    
    
    get_class: (exam) => {

        if (module.exports.validate_id(exam.id)) {

            if (db.classes[exam.class] == null) {

                throw 'No matching class';

            } else {

                return db.classes[exam.class];

            }

        } else {

            throw 'Invalid exam id';

        }
        
    },
    
    
    
    add_class: (clas) => {

        if (module.exports.validate_create(clas)) {

            var new_index = db.classes.length;
            clas.id = new_index;
            db.classes.push(clas);

            return _.cloneDeep(clas);

        } else {

            throw 'Invalid class';

        }

    },





    get_class_by_id: (id) => {

        if (module.exports.validate_id(id)) {

            if (db.classes[id] == null) {
                
              throw 'Not existing class'  

            } else {

                return db.classes[id];

            }
            

        } else {

            throw 'Invalid id';

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