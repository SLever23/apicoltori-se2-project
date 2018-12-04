const app = require('../../api.js').app;
const db = require('../../db/db.js');
const request = require('supertest');
const url = "http://localhost:3000";
const v = '/v1';
var server;

test('valid tasks_post', async () => {
    db.tasks = [];
    let body = { id: null, title: "the titolo", description: "the descrizione", topic: [], type: "true-false" };
    let response = await request(app).post(v + '/tasks').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send(body);
    expect(JSON.parse(response.text)).toEqual({ id: 0, title: "the titolo", description: "the descrizione", topic: [], type: "true-false" });
});

test('invalid tasks_post', async () => {
    db.tasks = [];
    let body = { id: null, title: "", description: "the descrizione", topic: [], type: "true-false" };
    let response = await request(app).post(v + '/tasks').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send(body);
    expect(response.text).toEqual('Invalid task');
    expect(response.status).toBe(500);
});

test('tasks_get', async () => {
    db.tasks.push({ id: 0, title: "the titolo 0", description: "the descrizione", topic: [], type: "true-false" });
    db.tasks.push({ id: 1, title: "the titolo 1", description: "the descrizione 1", topic: [], type: "true-false" });
    db.tasks.push({ id: 2, title: "the titolo 2", description: "the descrizione 2", topic: [], type: "true-false" });

    let expectation = [{ "description": "the descrizione", "id": 0, "title": "the titolo 0", "topic": [], "type": "true-false" },
    { "description": "the descrizione 1", "id": 1, "title": "the titolo 1", "topic": [], "type": "true-false" },
    { "description": "the descrizione 2", "id": 2, "title": "the titolo 2", "topic": [], "type": "true-false" }];

    let response = await request(app).get(v + '/tasks?searchkey=the titolo').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send();
    expect(JSON.parse(response.text)).toEqual(expectation);
    expect(response.status).toBe(200);

    response = await request(app).get(v + '/tasks?searchkey=nulla').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send();
    expect(JSON.parse(response.text)).toEqual([]);
    expect(response.status).toBe(200);

    response = await request(app).get(v + '/tasks?searchkey=the descrizione 1').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send();
    expect(JSON.parse(response.text)).toEqual([{ "description": "the descrizione 1", "id": 1, "title": "the titolo 1", "topic": [], "type": "true-false" }]);
    expect(response.status).toBe(200);
});

test('task_id_put',async() => {
    db.tasks = [];
    db.tasks.push({ id: 0, title: "the titolo 0", description: "the descrizione", topic: [], type: "true-false" });
    db.tasks.push({ id: 1, title: "the titolo 1", description: "the descrizione 1", topic: [], type: "true-false" });
    db.tasks.push({ id: 2, title: "the titolo 2", description: "the descrizione 2", topic: [], type: "true-false" });

    let body = { id: null, title: "the titolo nuovo", description: "the descrizione nuova", topic: [], type: "multiple-choice" };
    let response = await request(app).put(v + '/tasks/1').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send(body);
    expect(response.status).toBe(204);
    expect(db.tasks[1]).toEqual({ id: 1, title: "the titolo nuovo", description: "the descrizione nuova", topic: [], type: "multiple-choice" });

    response = await request(app).put(v + '/tasks/wat').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send(body);
    expect(response.status).toBe(500);
});

test('get_task_by_id',async() => {
    db.tasks = [];
    db.tasks.push({ id: 0, title: "the titolo 0", description: "the descrizione", topic: [], type: "true-false" });
    db.tasks.push({ id: 1, title: "the titolo 1", description: "the descrizione 1", topic: [], type: "true-false" });
    db.tasks.push({ id: 2, title: "the titolo 2", description: "the descrizione 2", topic: [], type: "true-false" });

    let body = { id: null, title: "the titolo nuovo", description: "the descrizione nuova", topic: [], type: "multiple-choice" };
    let response = await request(app).get(v + '/tasks/1').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send();
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual({ id: 1, title: "the titolo 1", description: "the descrizione 1", topic: [], type: "true-false" });

    response = await request(app).get(v + '/tasks/4').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send(body);
    expect(response.status).toBe(404);

    response = await request(app).get(v + '/tasks/hey').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send(body);
    expect(response.status).toBe(404);
});

test('task_id_delete',async() => {
    db.tasks = [];
    db.tasks.push({ id: 0, title: "the titolo 0", description: "the descrizione", topic: [], type: "true-false" });
    db.tasks.push({ id: 1, title: "the titolo 1", description: "the descrizione 1", topic: [], type: "true-false" });
    db.tasks.push({ id: 2, title: "the titolo 2", description: "the descrizione 2", topic: [], type: "true-false" });

    let body = { id: null, title: "the titolo nuovo", description: "the descrizione nuova", topic: [], type: "multiple-choice" };
    let response = await request(app).delete(v + '/tasks/1').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send();
    expect(response.status).toBe(204);
    expect(db.tasks[1]).toEqual(undefined);

    response = await request(app).delete(v + '/tasks/4').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send(body);
    expect(response.status).toBe(404);

    response = await request(app).delete(v + '/tasks/hey').set('Content-Type', 'application/json')
        .set('Accept', 'application/json').send(body);
    expect(response.status).toBe(404);
});

