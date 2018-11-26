const tl = require('./task_logic.js');
const db = require('../../../db/db.js');

test('add invalid task', () => {
    expect(tl.add_task(null)).toThrow();
    expect(tl.add_task(undefined)).toThrow();

    let task = {id: 0, title: null, description: null, topic: null, type: null};
    expect(tl.add_task(task)).toThrow();

    task = {id: 0, title: undefined, description: undefined, topic: undefined, type: undefined};
    expect(tl.add_task(task)).toThrow();

    task = {id: "aaa", title: "aaa", description: "aaa", topic: "aaa", type: "true-false"};
    expect(tl.add_task(task)).toThrow();

    task = {id: 0, title: null, description: "aaa", topic: "aaa", type: "true-false"};
    expect(tl.add_task(task)).toThrow();

    task = {id: 0, title: "aaa", description: null, topic: "aaa", type: "true-false"};
    expect(tl.add_task(task)).toThrow();

    task = {id: 0, title: "aaa", description: "aaa", topic: "aaa", type: null};
    expect(tl.add_task(task)).toThrow();
});

test('add valid task', () => {
    let task = {id: null, title: "the titolo", description: "the descrizione", topic: [], type: "true-false"};
    tl.add_task(task);
    expect(db.tasks.length).toBe(1);
});

test('search invalid searchkey', () => {
    expect(tl.get_tasks(10)).toThrow();
    expect(tl.get_tasks(null)).toThrow();
    expect(tl.get_tasks(undefined)).toThrow();
});

test('search valid searchkey', () => {
    let task = {id: 0, title: "the titolo", description: "the descrizione", topic: [], type: "true-false"};
    db.tasks.push()

    
    expect(tl.get_tasks("the titolo")).toBe([{id: 0, title: "the titolo", description: "the descrizione", topic: [], type: "true-false"}]);
});