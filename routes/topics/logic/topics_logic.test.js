/**
 * Unit testing for the logics of the topic resource handling
 */
const topics_logic = require('./topics_logic.js');
const db = require('../../../db/db.js');

afterAll(() => console.log('afterAll'));

let call = (funct, argument) => {
    let f = () => { funct(argument) };
    return f;
};
/*
describe('Test argument number', () => {
    test('Test add topic', () => {
        let f = () => {
            return topics_logic.add_topic();
        };
        expect(f).toThrow();
        let g = () => {
            return topics_logic.add_topic({title : 'Github'},123);
        };
        expect(g).toThrow();
    });

    test('Test validate topic', () => {
        let f = () => {
            return topics_logic.validate_create();
        };
        expect(f).toThrow();
        let g = () => {
            return topics_logic.validate_create({title : 'Github'},123);
        };
        expect(g).toThrow();
    });

    test('Test get topic', () => {
        let f = () => {
            return topics_logic.add_topic();
        };
        expect(f).toThrow();
        let g = () => {
            return topics_logic.add_topic(123,123);
        };
        expect(g).toThrow();
    });
});
*/
describe('Test get topic function', () => {
    test('Get first topic', () => {
        var topic = db.get_topic_obj();
        topic.id = 0;
        topic.title = 'Github';
        db.topics.push(topic);
        var got = topics_logic.get_topic_by_id(0);
        expect(got).not.toBeUndefined();
        expect(got).not.toBeNull();
        expect(got.id).toBe(0);
    });

    test('Get last topic', () => {
        var topic2 = db.get_topic_obj();
        topic2.id = 1;
        topic2.title = 'API Design';
        db.topics.push(topic2);
        var topic3 = db.get_topic_obj();
        topic3.id = 2;
        topic3.title = 'Testing';
        db.topics.push(topic3);
        got = topics_logic.get_topic_by_id(db.topics.length - 1);
        expect(got).not.toBeUndefined();
        expect(got).not.toBeNull();
        expect(got.id).toBe(db.topics.length - 1);
    });
    
    test('Get topic', () => {
        got = topics_logic.get_topic_by_id(1);
        expect(got).not.toBeUndefined();
        expect(got).not.toBeNull();
        expect(got.id).toBe(1);
    });

    test('Get non-existing topic', () => {
        // Search topic that never existed
        expect(topics_logic.get_topic_by_id(2364)).toBeUndefined();
    });

    test('Get deleted topic', () => {
        db.topics[1] = undefined;
        expect(topics_logic.get_topic_by_id(1)).toBeUndefined();
    });

    test('Get topic with negative id', () => {
        expect(call(topics_logic.get_topic_by_id,-1)).toThrow();
    });

    test('Get topic with non int id', () => {
        expect(call(topics_logic.get_topic_by_id,'236asd4')).toThrow();
    });
});

describe('Test validation function', () => {
    test('Validate valid topic', () => {
        var topic = db.get_topic_obj();
        topic.title = 'API Design';
        expect(topics_logic.validate_create(topic)).toBe(true);
        // It should not check for the id
        topic.id = 1;
        expect(topics_logic.validate_create(topic)).toBe(true);
        topic.id = 'Definetly not a valid id';
        expect(topics_logic.validate_create(topic)).toBe(true);
    });

    test('Validate null topic', () => {
        expect(topics_logic.validate_create(null)).toBe(false);
    });

    test('Validate topic with null title', () => {
        var topic = db.get_topic_obj();
        topic.title = null;
        expect(topics_logic.validate_create(topic)).toBe(false);
        topic.title = undefined;
        expect(topics_logic.validate_create(topic)).toBe(false);
    });
    test('Validate topic with empty title', () => {
        var topic = db.get_topic_obj();
        topic.title = '';
        expect(topics_logic.validate_create(topic)).toBe(false);
    });

    test('Validate topic with title not string', () => {
        var topic = db.get_topic_obj();
        topic.title = 123;
        expect(topics_logic.validate_create(topic)).toBe(false);
    });
});

describe('Test add topic function', () => {

    test('Add valid topic', () => {
        var topic = db.get_topic_obj();
        topic.title = 'API Design';
        var added = topics_logic.add_topic(topic);
        expect(added).not.toBeUndefined();
        expect(added).not.toBeNull();
        // The id is the greatest currently used in the system
        expect(added.id).toBe(db.topics.length - 1);
    });

    test('Add a non-topic object', () => {
        function addNaT() {
            topics_logic.add_topic(123);
        }
        // Try adding something that is not a topic
        expect(addNaT).toThrow();
    });

    test('Add topic without title', () => {
        var topic = db.get_topic_obj();
        topic.title = null;
        function add() {
            topics_logic.add_topic(topic);
        }
        expect(add).toThrow();
    });
});

describe('Test get all topics function', () => {
    test('Success', () => {
        expect(topics_logic.get_all_topics()).toEqual(db.topics);
    });
});