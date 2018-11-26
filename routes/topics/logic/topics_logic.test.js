/**
 * Unit testing for the logics of the topic resource handling
 */
const topics_logic = require('./topics_logic.js');
const db = require('../../../db/db.js');

describe('Test topics logic module', () => {
    test('Get existing topic', () => {
        var topic = db.get_topic_obj;
        topic.id = 0;
        topic.title = 'Github';
        db.topics.push(topic);
        var got = topics_logic.get_topic_by_id(0);
        expect(got).not.toBeUndefined();
        expect(got).not.toBeNull();
        expect(got.id).toBe(0);
        // Get last element of collection - border case
        var topic2 = db.get_topic_obj;
        topic2.id = 1;
        topic2.title = 'API Design';
        db.topics.push(topic2);
        var topic3 = db.get_topic_obj;
        topic3.id = 2;
        topic3.title = 'Testing';
        db.topics.push(topic3);
        got = topics_logic.get_topic_by_id(db.topics.length - 1);
        expect(got).not.toBeUndefined();
        expect(got).not.toBeNull();
        expect(got.id).toBe(db.topics.length - 1);
    });

    test('Get non-existing topic', () => {
        // Search topic that never existed
        expect(topics_logic.get_topic_by_id(2364)).toBeUndefined();
        // Delete topic with id 1 -> it does not exist anymore
        db.topics[1] = undefined;
        expect(topics_logic.get_topic_by_id(1)).toBeUndefined();
    });

    test('Get topic with invalid id', () => {
        function negative() {
            topics_logic.get_topic_by_id(-2364);
        }
        function string() {
            topics_logic.get_topic_by_id('236asd4');
        }
        function nan() {
            topics_logic.get_topic_by_id(NaN);
        }
        expect(string).toThrow();
        expect(negative).toThrow();
        expect(nan).toThrow();
    });

    test('Validate valid topic', () => {
        var topic = db.get_topic_obj;
        topic.title = 'API Design';
        expect(topics_logic.validate_create(topic)).toBe(true);
        // It should not check for the id
        topic.id = 1;
        expect(topics_logic.validate_create(topic)).toBe(true);
        topic.id = 'Definetly not a valid id';
        expect(topics_logic.validate_create(topic)).toBe(true);
    });

    test('Validate invalid topic', () => {
        expect(topics_logic.validate_create(null)).toBe(false);
        expect(topics_logic.validate_create(undefined)).toBe(false);
        var topic = db.get_topic_obj;
        topic.title = '';
        function call() {
            return topics_logic.validate_create(topic);
        }
        expect(call()).toBe(false);
        topic.title = 123;
        expect(call()).toBe(false);
        topic.title = null;
        expect(call()).toBe(false);
        topic.title = undefined;
        expect(call()).toBe(false);
    });

    test('Add valid topic', () => {
        var topic = db.get_topic_obj;
        topic.title = 'API Design';
        var added = topics_logic.add_topic(topic);
        expect(added).not.toBeUndefined();
        expect(added).not.toBeNull();
        // The id is the greatest currently used in the system
        expect(added.id).toBe(db.topics.length - 1);
    });

    test('Add invalid topic', () => {
        var topic = db.get_topic_obj;
        topic.title = null;
        function add() {
            topics_logic.add_topic(topic);
        }
        function addNat() {
            topics_logic.add_topic(123);
        }
        expect(add).toThrow();
        topic.title = undefined;
        expect(add).toThrow();
        // Try adding something that is not a topic
        expect(addNat).toThrow();
    });
});