const logic = require('./exams_logic.js');
const db = require('../../../db/db.js');

var get_valid_exam = () => {
    db.classes[1] = { id: 1 };
    db.users[1] = { id : 1 };
    db.users[2] = { id : 2 };
    db.tasks[1] = { id : 1 };
    db.tasks[2] = { id : 2 };
    db.tasks[4] = { id : 4 };
    db.topics[2] = { id : 2 };
    db.topics[5] = { id : 5 };
    let exam = db.get_exam_obj();
    exam.title = 'Software Engineering 2';
    exam.type = 'Exam';
    exam.class = 1;
    exam.deadline_delivery = '2019-06-22T12:00:00+0000'; // Format date?
    exam.deadline_review = '2019-06-25T13:00:00+0000';
    exam.start_date = '2015-06-20T12:00:00+0000';
    exam.collaborators = [1,2];
    exam.compulsory_tasks[1,2,4];
    exam.task_pool = [ { id_topic : 2, quantity : 2 },
                        { id_topic : 5, quantity : 3 } ];
    return exam;
}

var get_valid_taskpool_entry = () => {
    db.topics[1] = { id : 1 };
    return {
        id_topic : 1,
        quantity : 2 
    }
}

describe('Test exam creation in logic module', () => {
    test('Add valid exam', () => {
        let exam = get_valid_exam();
        let result = logic.add_exam(exam);
        expect(result.id).toEqual(db.exams.length-1);
        expect(db.exams[result.id]).toEqual(result);
    });

    test('Add invalid exam - No title', () => {
        let exam = get_valid_exam();
        exam.title = null;
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Title not valid');
    });

    test('Add invalid exam - Title not string', () => {
        let exam = get_valid_exam();
        exam.title = 1;
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Title not valid');
    });

    test('Add invalid exam - No delivery deadline', () => {
        let exam = get_valid_exam();
        exam.deadline_delivery = null;

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Delivery deadline not valid');
    });

    test('Add invalid exam - Bad format delivery deadline', () => {
        let exam = get_valid_exam();
        exam.deadline_delivery = 'Definetly not a valid date';

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Delivery deadline not valid');
    });

    test('Add invalid exam - delivery deadline not string', () => {
        let exam = get_valid_exam();
        exam.deadline_delivery = { item : 'What is this' };

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Delivery deadline not valid');
    });

    test('Add invalid exam - No review deadline', () => {
        let exam = get_valid_exam();
        exam.deadline_review = null;

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Review deadline not valid');
    });

    test('Add invalid exam - invalid review deadline', () => {
        let exam = get_valid_exam();
        exam.deadline_review = 'Definetly not a valid date';

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Review deadline not valid');
    });

    test('Add invalid exam - review deadline not a string', () => {
        let exam = get_valid_exam();
        exam.deadline_review = [ 'So much not a string' ];
        
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Review deadline not valid');
    });

    test('Add invalid exam - No start date', () => {
        let exam = get_valid_exam();
        exam.start_date = null;

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Start date not valid');
    });

    test('Add invalid exam - invalid start date', () => {
        let exam = get_valid_exam();
        exam.start_date = 'Definetly not a valid date';

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Start date not valid');
    });

    test('Add invalid exam - start date not a string', () => {
        let exam = get_valid_exam();
        exam.start_date = [ 'So much not a string' ];
        
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Start date not valid');
    });

    test('Add invalid exam - No type', () => {
        let exam = get_valid_exam();
        exam.type = null;

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Exam type not valid');
    });

    test('Add invalid exam - invalid type', () => {
        let exam = get_valid_exam();
        exam.type = 'Neither crowdsourcing nor exam';

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Exam type not valid');
    });

    test('Add invalid exam - type not a string', () => {
        let exam = get_valid_exam();
        exam.type = [ 'So much not a string' ];
        
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Exam type not valid');
    });

    test('Add invalid exam - Class id not positive integer', () => {
        let exam = get_valid_exam();
        exam.class = -1;

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Class not found or id invalid');
    });

    test('Add invalid exam - Class id does not match any class', () => {
        let exam = get_valid_exam();
        exam.class = 1000;
        
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Class not found or id invalid');
    });
    // Split cases where id is string and negative integer
    test('Add invalid exam - collaborator ids not positive integer', () => {
        let exam = get_valid_exam();
        exam.collaborators = [ "Not a positive integer", -1, "1"];

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Collaborators not found or id invalid');
    });

    test('Add invalid exam - Collaborator ids do not match any users', () => {
        let exam = get_valid_exam();
        exam.collaborators = [ 1000 ];
        
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Collaborators not found or id invalid');
    });

    test('Add invalid exam - Compulsory tasks ids not integer', () => {
        let exam = get_valid_exam();
        exam.compulsory_tasks = [ 'So much not a positive integer', -1 ];
        
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Invalid task id in compulsory tasks');
    });

    test('Add invalid exam - Compulsory tasks ids do not match any tasks', () => {
        let exam = get_valid_exam();
        exam.compulsory_tasks = [ 1000 ];
        
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Task in compulsory tasks not found');
    });

    test('Add invalid exam - Task pool not array of required objects', () => {
        let exam = get_valid_exam();
        exam.task_pool = [ { wtf : 'hello' }];
        
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Invalid topic id in task pool');
    });

    test('Add invalid exam - Topic ids in task pool not positive integers', () => {
        let exam = get_valid_exam();
        let entry = get_valid_taskpool_entry();
        entry.id_topic = -1;
        let entry2 = get_valid_taskpool_entry();
        entry2.id_topic = '123';
        exam.task_pool = [ entry, entry2 ];
        
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Invalid topic id in task pool');
    });

    test('Add invalid exam - Quantities in task pool not positive integers', () => {
        let exam = get_valid_exam();
        let entry = get_valid_taskpool_entry();
        entry.quantity = -1;
        let entry2 = get_valid_taskpool_entry();
        entry2.quantity = 3.14; 
        exam.task_pool = [ entry, entry2 ];
        
        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Quantities for task pool invalid');
    });

    test('Add invalid exam - Topic ids in task pool do not match any topics', () => {
        let exam = get_valid_exam();
        let entry = get_valid_taskpool_entry();
        entry.id_topic = 1000;
        exam.task_pool = [ entry  ];

        let f = () => {
            return logic.add_exam(exam);
        };
        expect(f).toThrow('Topic in task pool not found');
    });

});

describe('Test exam retrieval in logic module', () => {

    describe('Test in teacher mode', () => {

        test('Get exam with valid id', () => {
            let exam = get_valid_exam();
            exam.id = 2;
            db.exams[2] = exam;
            expect(logic.get_by_id(2)).toEqual(db.exams[2]);
        });

        test('Get exam with valid id - 0', () => {
            expect(logic.get_by_id(0)).toEqual(db.exams[0]);
        });

        test('Get exam with valid id - last id', () => {
            let exam = get_valid_exam();
            exam.id = 5;
            db.exams[5] = exam;
            expect(logic.get_by_id(db.exams.length-1)).toEqual(db.exams[db.exams.length-1]);
        });

        test('Get exam with invalid id - null', () => {
            let f = () => {
                return logic.get_by_id(null);
            }

            expect(f).toThrow();
        });

        test('Get exam with valid id - isNaN', () => {
            let f = () => {
                return logic.get_by_id('Not an id');
            }

            expect(f).toThrow();
        });

        test('Get exam with valid id - not integer', () => {
            let f = () => {
                return logic.get_by_id(3.14);
            }

            expect(f).toThrow();
        });

        test('Get exam with valid id - not positive', () => {
            let f = () => {
                return logic.get_by_id(-1);
            }

            expect(f).toThrow();
        });
    });

    describe('Test exam retrieval in student mode', () => {
        // TEST THAT DRAW IS WITH CORRECT TOPICS AND NUMBER OF TASKS
        // TEST THAT THERE IS MARK
        // TEST THAT USER ID IS SET
    });
});