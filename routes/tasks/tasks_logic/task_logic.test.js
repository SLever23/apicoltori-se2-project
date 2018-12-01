const tl = require('./tasks_logic.js');
const db = require('../../../db/db.js');

test('add invalid tasks', () => {
    expect(() => { tl.add_task(null) }).toThrow();
    expect(() => { tl.add_task(undefined) }).toThrow();

    let task = { id: 0, title: null, description: null, topic: null, type: null };
    expect(() => { tl.add_task(task) }).toThrow();

    task = { id: 0, title: undefined, description: undefined, topic: undefined, type: undefined };
    expect(() => { tl.add_task(task) }).toThrow();

    task = { id: 0, title: null, description: "aaa", topic: "aaa", type: "true-false" };
    expect(() => { tl.add_task(task) }).toThrow();

    task = { id: 0, title: "aaa", description: null, topic: "aaa", type: "true-false" };
    expect(() => { tl.add_task(task) }).toThrow();

    task = { id: 0, title: "aaa", description: "aaa", topic: "aaa", type: null };
    expect(() => { tl.add_task(task) }).toThrow();

    task = { id: 0, title: "aaa", description: "", topic: "aaa", type: "true-false" };
    expect(() => { tl.add_task(task) }).toThrow();

    task = { id: 0, title: "", description: "aaa", topic: "aaa", type: "true-false" };
    expect(() => { tl.add_task(task) }).toThrow();

    task = { id: 0, title: "aaa", description: "aaa", topic: "aaa", type: "" };
    expect(() => { tl.add_task(task) }).toThrow();
});

test('add valid tasks', () => {
    db.tasks = [];
    let task = { id: null, title: "the titolo", description: "the descrizione", topic: [], type: "true-false" };
    tl.add_task(task);
    expect(db.tasks[0]).toEqual({ id: 0, title: "the titolo", description: "the descrizione", topic: [], type: "true-false" });
    task = { id: "null", title: "the titolo", description: "the descrizione", topic: [], type: "true-false" };
    tl.add_task(task);
    expect(db.tasks[1]).toEqual({ id: 1, title: "the titolo", description: "the descrizione", topic: [], type: "true-false" });
});

test('search invalid searchkey', () => {
    expect(() => { tl.get_tasks(10) }).toThrow();
    expect(() => { tl.get_tasks(null) }).toThrow();
    expect(() => { tl.get_tasks(undefined) }).toThrow();
});

test('search valid searchkey', () => {
    db.tasks.push({ id: 0, title: "the titolo 0", description: "the descrizione", topic: [], type: "true-false" });
    db.tasks.push({ id: 1, title: "the titolo 1", description: "the descrizione 1", topic: [], type: "true-false" });
    db.tasks.push({ id: 2, title: "the titolo 2", description: "the descrizione 2", topic: [], type: "true-false" });

    expect(tl.get_tasks("the titolo 0")).toEqual({ id: 0, title: "the titolo 0", description: "the descrizione", topic: [], type: "true-false" });
});

test('get task by id', () => {
    db.tasks = [];
    db.tasks.push({ id: 0, title: "the titolo 0", description: "the descrizione", topic: [], type: "true-false" });
    db.tasks.push({ id: 1, title: "the titolo 1", description: "the descrizione 1", topic: [], type: "true-false" });
    db.tasks.push({ id: 2, title: "the titolo 2", description: "the descrizione 2", topic: [], type: "true-false" });
    expect(() => { tl.get_task_by_id(-1) }).toThrow();
    expect(() => { tl.get_task_by_id(null) }).toThrow();
    expect(() => { tl.get_task_by_id(undefined) }).toThrow();
    expect(tl.get_task_by_id(2)).toEqual({ id: 2, title: "the titolo 2", description: "the descrizione 2", topic: [], type: "true-false" });
});

test(('update with an invalid id'),() => {
    db.tasks = [];
    db.tasks.push({ id: null, title: "the titolo 0", description: "the descrizione", topic: [], type: "true-false" });
    let task = { id: 0, title: "aaa", description: "aaa", topic: "aaa", type: "" };
    expect(() => { tl.update_task(task,-2) }).toThrow();
    expect(() => { tl.update_task(task,undefined) }).toThrow();
    expect(() => { tl.update_task(task,null) }).toThrow();
    expect(() => { tl.update_task(task,3) }).toThrow();
})

test(('update with invalid tasks'), () => {
    db.tasks = [];
    db.tasks.push({ id: null, title: "the titolo 0", description: "the descrizione", topic: [], type: "true-false" });
    expect(() => { tl.update_task(null,0) }).toThrow();
    expect(() => { tl.update_task(undefined,0) }).toThrow();

    let task = { id: 0, title: null, description: null, topic: null, type: null };
    expect(() => { tl.update_task(task,0) }).toThrow();

    task = { id: 0, title: undefined, description: undefined, topic: undefined, type: undefined };
    expect(() => { tl.update_task(task,0) }).toThrow();

    task = { id: 0, title: null, description: "aaa", topic: "aaa", type: "true-false" };
    expect(() => { tl.update_task(task,0) }).toThrow();

    task = { id: 0, title: "aaa", description: null, topic: "aaa", type: "true-false" };
    expect(() => { tl.update_task(task,0) }).toThrow();

    task = { id: 0, title: "", description: "aaa", topic: "aaa", type: "true-false" };
    expect(() => { tl.update_task(task,0) }).toThrow();

    task = { id: 0, title: "aaa", description: "", topic: "aaa", type: "true-false" };
    expect(() => { tl.update_task(task,0) }).toThrow();

    task = { id: 0, title: "aaa", description: "aaa", topic: "aaa", type: "" };
    expect(() => { tl.update_task(task,0) }).toThrow();
});

test(('update with valid tasks'), () => {
    db.tasks = [];
    tl.add_task({ id: 3, title: "the titolo", description: "the descrizione", topic: [], type: "true-false" });
    tl.update_task({ id: null, title: "will work this test?", description: "the description will change?", topic: [], type: "multiple-choice", answers: ["true", "false", "it can't be said"] }, 0);
    expect(db.tasks[0]).toEqual({ id: 0, title: "will work this test?", description: "the description will change?", topic: [], type: "multiple-choice", answers: ["true", "false", "it can't be said"] });
});

test('delete task', () => {
    db.tasks = [];
    db.tasks.push({ id: 0, title: "the titolo 0", description: "the descrizione 0", topic: [], type: "true-false" });
    db.tasks.push({ id: 1, title: "the titolo 1", description: "the descrizione 1", topic: [], type: "true-false" });
    db.tasks.push({ id: 2, title: "the titolo 2", description: "the descrizione 2", topic: [], type: "true-false" });
    tl.delete_task(1);
    expect(db.tasks).toEqual([{ id: 0, title: "the titolo 0", description: "the descrizione 0", topic: [], type: "true-false" },
    { id: 2, title: "the titolo 2", description: "the descrizione 2", topic: [], type: "true-false" }]);

    expect(() => { tl.delete_task(1) }).toThrow();
    expect(() => { tl.delete_task("beh") }).toThrow();
    expect(() => { tl.delete_task(-11) }).toThrow();
    expect(() => { tl.delete_task(undefined) }).toThrow();
    expect(() => { tl.delete_task(null) }).toThrow();

    tl.delete_task(2);
    expect(db.tasks).toEqual([{ id: 0, title: "the titolo 0", description: "the descrizione 0", topic: [], type: "true-false" }]);
});