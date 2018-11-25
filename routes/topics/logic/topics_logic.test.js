const topics_logic = require('./topics_logic.js');
const db = require('../../../db/db.js');

test('Get existing topic', () => {
    var topic = db.get_topic_obj;
    topic.id = 0;
    topic.name = 'Github';
    db.topics.push(topic);
    var got = topics_logic.get_topic_by_id(0);
    expect(got).not.toBeUndefined();
    expect(got).not.toBeNull();
    expect(got.id).toBe(0);
    // Get last element of collection
    var topic2 = db.get_topic_obj;
    topic2.id = 1;
    topic2.name = 'API Design';
    db.topics.push(topic2);
    var topic3 = db.get_topic_obj;
    topic3.id = 2;
    topic3.name = 'Testing';
    db.topics.push(topic3);
    got = topics_logic.get_topic_by_id(db.topics.length - 1);
    expect(got).not.toBeUndefined();
    expect(got).not.toBeNull();
    expect(got.id).toBe(db.topics.length - 1);
});

test('Get non-existing topic', () => {
    expect(topics_logic.get_topic_by_id(2364)).toBeUndefined();
    // Delete topic with id 1
    db.topics[1] = undefined;
    expect(topics_logic.get_topic_by_id(1)).toBeUndefined();
});

test('Get topic with invalid id', () => {
    expect(topics_logic.get_topic_by_id('2364')).toThrow();
    expect(topics_logic.get_topic_by_id(-2364)).toThrow();
});

test('Validate valid topic', () => {
    var topic = db.get_topic_obj;
    topic.name = 'API Design';
    expect(topics_logic.validate_create(topic)).toBe(true);
});

test('Validate invalid topic', () => {
    var topic = db.get_topic_obj;
    topic.name = null;
    expect(topics_logic.validate_create(topic)).toBe(false);
    topic.name = undefined;
    expect(topics_logic.validate_create(topic)).toBe(false);
    topic.name = 123;
    expect(topics_logic.validate_create(topic)).toBe(false);
});

test('Add valid topic', () => {
    var topic = db.get_topic_obj;
    topic.name = 'API Design';
    var added = topics_logic.add_topic(topic);
    expect(added).not.toBeUndefined();
    expect(added).not.toBeNull();
    // The id is the greatest currently used in the system
    expect(added.id).toBe(db.topics.length - 1);
});

test('Add invalid topic', () => {
    var topic = db.get_topic_obj;
    topic.name = null;
    expect(topics_logic.add_topic(topic)).toThrow();
    topic.name = undefined;
    expect(topics_logic.add_topic(topic)).toThrow();
    expect(topics_logic.add_topic(123)).toThrow();
});
