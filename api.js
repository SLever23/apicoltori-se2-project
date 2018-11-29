const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());

var tasks = require('./routes/tasks/tasks.js');
var exams = require('./routes/exams/exams.js');
var users = require('./routes/users/users.js');
var classes = require('./routes/classes/classes.js');
var submissions = require('./routes/submissions/submissions.js');
var reviews = require('./routes/reviews/reviews.js');
var topics = require('./routes/topics/topics.js');
var peer = require('./routes/peer/peer.js');
var isUp = false;


// ----------------------------------------------------------- //
//////////////////////////// ROOT ///////////////////////////////
// ----------------------------------------------------------- //
app.get('/', (req, res) => res.send('Welcome to Beekeeper'));

// ----------------------------------------------------------- //
/////////////////////// TASK MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/tasks', (req,res) => {
    tasks.tasks_get(req,res);
});

app.post('/v1/tasks', (req,res) => {
    tasks.tasks_post(req,res);
});

app.get('/v1/tasks/:id', (req,res) => {
    tasks.tasks_id_get(req,res);
});

app.put('/v1/tasks/:id', (req,res) => {
    tasks.tasks_id_put(req,res);
});

app.delete('/v1/tasks/:id', (req,res) => {
    tasks.tasks_id_delete(req,res);
});

// ----------------------------------------------------------- //
/////////////////////// EXAM MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/exams', (req,res) => {
    exams.exams_get(req,res);
});

app.post('/v1/exams', (req,res) => {
    exams.exams_post(req,res);
});

app.get('/v1/exams/:id', (req,res) => {
    exams.exams_id_get(req,res);
});

app.put('/v1/exams/:id', (req,res) => {
    exams.exams_id_put(req,res);
});

app.delete('/v1/exams/:id', (req,res) => {
    exams.exams_id_delete(req,res);
});

// ----------------------------------------------------------- //
/////////////////////// USER MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/users', (req,res) => {
    users.users_get(req,res);
});

app.post('/v1/users', (req,res) => {
    users.users_post(req,res);
});

app.get('/v1/users/:id', (req,res) => {
    users.users_id_get(req,res);
});

app.post('/v1/session', (req,res) => {
    users.session_post(req,res);
});

app.delete('/v1/session/:token', (req,res) => {
    users.session_token_delete(req,res);
});

// ----------------------------------------------------------- //
////////////////////// CLASS MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/classes', (req,res) => {
    classes.classes_get(req,res);
});

app.post('/v1/classes', (req,res) => {
    classes.classes_post(req,res);
});

app.get('/v1/classes/:id', (req,res) => {
    classes.classes_id_get(req,res);
});

app.put('/v1/classes/:id', (req,res) => {
    classes.classes_id_put(req,res);
});

app.delete('/v1/classes/:id', (req,res) => {
    classes.classes_id_delete(req,res);
});

// ----------------------------------------------------------- //
//////////////////// SUBMISSION MANAGEMENT //////////////////////
// ----------------------------------------------------------- //
app.get('/v1/submissions', (req,res) => {
    submissions.submissions_get(req,res);
});

app.post('/v1/submissions', (req,res) => {
    submissions.submissions_post(req,res);
});

app.get('/v1/submissions/:id', (req,res) => {
    submissions.submissions_id_get(req,res);
});

app.put('/v1/submissions/:id', (req,res) => {
    submissions.submissions_id_put(req,res);
});

app.delete('/v1/submissions/:id', (req,res) => {
    submissions.submissions_id_delete(req,res);
});

// ----------------------------------------------------------- //
///////////////////// REVIEW MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/reviews', (req,res) => {
    reviews.reviews_get(req,res);
});

app.post('/v1/reviews', (req,res) => {
    reviews.reviews_post(req,res);
});

app.get('/v1/reviews/:id', (req,res) => {
    reviews.reviews_id_get(req,res);
});

app.put('/v1/reviews/:id', (req,res) => {
    reviews.reviews_id_put(req,res);
});

app.delete('/v1/reviews/:id', (req,res) => {
    reviews.reviews_id_delete(req,res);
});

// ----------------------------------------------------------- //
////////////////////// TOPIC MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/topics', (req,res) => {
    topics.topics_get(req,res);
});

app.post('/v1/topics', (req,res) => {
    topics.topics_post(req, res);
});

app.get('/v1/topics/:id', (req,res) => {
    topics.topics_id_get(req,res);
});

app.put('/v1/topics/:id', (req,res) => {
    topics.topics_id_put(req,res);
});

app.delete('/v1/topics/:id', (req,res) => {
    topics.topics_id_delete(req,res);
});

// ----------------------------------------------------------- //
/////////////////////// PEER MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/peer', (req,res) => {
    peer.peer_get(req,res);
});
if (process.env.NODE_ENV != 'test') {
    app.listen(PORT, () => {
        console.log('SE2-Project at port: '+ PORT);
    });
}

exports.up = isUp;
exports.app = app;