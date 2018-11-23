const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------------- //
//////////////////////////// ROOT ///////////////////////////////
// ----------------------------------------------------------- //
app.get('/', (req, res) => res.send('Welcome to Beekeeper'));

// ----------------------------------------------------------- //
/////////////////////// TASK MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/tasks', (req,res) => {
    console.log('GET on /tasks');
    res.status(501).send('Coming soon!');
});

app.post('/v1/tasks', (req,res) => {
    console.log('POST on /tasks');
    res.status(501).send('Coming soon!');
});

app.get('/v1/tasks/:id', (req,res) => {
    console.log('GET on /tasks/:id');
    res.status(501).send('Coming soon!');
});

app.put('/v1/tasks/:id', (req,res) => {
    console.log('PUT on /tasks/:id');
    res.status(501).send('Coming soon!');
});

app.delete('/v1/tasks/:id', (req,res) => {
    console.log('DELETE on /tasks/:id');
    res.status(501).send('Coming soon!');
});

// ----------------------------------------------------------- //
/////////////////////// EXAM MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/exams', (req,res) => {
    console.log('GET on /exams');
    res.status(501).send('Coming soon!');
});

app.post('/v1/exams', (req,res) => {
    console.log('POST on /exams');
    res.status(501).send('Coming soon!');
});

app.get('/v1/exams/:id', (req,res) => {
    console.log('GET on /exams/:id');
    res.status(501).send('Coming soon!');
});

app.put('/v1/exams/:id', (req,res) => {
    console.log('PUT on /exams/:id');
    res.status(501).send('Coming soon!');
});

app.delete('/v1/exams/:id', (req,res) => {
    console.log('DELETE on /exams/:id');
    res.status(501).send('Coming soon!');
});

// ----------------------------------------------------------- //
/////////////////////// USER MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/users', (req,res) => {
    console.log('GET on /users');
    res.status(501).send('Coming soon!');
});

app.post('/v1/users', (req,res) => {
    console.log('POST on /users');
    res.status(501).send('Coming soon!');
});

app.get('/v1/users/:id', (req,res) => {
    console.log('GET on /users/:id');
    res.status(501).send('Coming soon!');
});

app.post('/v1/session', (req,res) => {
    console.log('POST on /session');
    res.status(501).send('Coming soon!');
});

app.delete('/v1/session/:token', (req,res) => {
    console.log('DELETE on /session/:token');
    res.status(501).send('Coming soon!');
});

// ----------------------------------------------------------- //
////////////////////// CLASS MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/classes', (req,res) => {
    console.log('GET on /classes');
    res.status(501).send('Coming soon!');
});

app.post('/v1/classes', (req,res) => {
    console.log('POST on /classes');
    res.status(501).send('Coming soon!');
});

app.get('/v1/classes/:id', (req,res) => {
    console.log('GET on /classes/:id');
    res.status(501).send('Coming soon!');
});

app.put('/v1/classes/:id', (req,res) => {
    console.log('PUT on /classes/:id');
    res.status(501).send('Coming soon!');
});

app.delete('/v1/classes/:id', (req,res) => {
    console.log('DELETE on /classes/:id');
    res.status(501).send('Coming soon!');
});

// ----------------------------------------------------------- //
//////////////////// SUBMISSION MANAGEMENT //////////////////////
// ----------------------------------------------------------- //
app.get('/v1/submissions', (req,res) => {
    console.log('GET on /submissions');
    res.status(501).send('Coming soon!');
});

app.post('/v1/submissions', (req,res) => {
    console.log('POST on /submissions');
    res.status(501).send('Coming soon!');
});

app.get('/v1/submissions/:id', (req,res) => {
    console.log('GET on /submissions/:id');
    res.status(501).send('Coming soon!');
});

app.put('/v1/submissions/:id', (req,res) => {
    console.log('PUT on /submissions/:id');
    res.status(501).send('Coming soon!');
});

app.delete('/v1/submissions/:id', (req,res) => {
    console.log('DELETE on /submissions/:id');
    res.status(501).send('Coming soon!');
});

// ----------------------------------------------------------- //
///////////////////// REVIEW MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/reviews', (req,res) => {
    console.log('GET on /reviews');
    res.status(501).send('Coming soon!');
});

app.post('/v1/reviews', (req,res) => {
    console.log('POST on /reviews');
    res.status(501).send('Coming soon!');
});

app.get('/v1/reviews/:id', (req,res) => {
    console.log('GET on /reviews/:id');
    res.status(501).send('Coming soon!');
});

app.put('/v1/reviews/:id', (req,res) => {
    console.log('PUT on /reviews/:id');
    res.status(501).send('Coming soon!');
});

app.delete('/v1/reviews/:id', (req,res) => {
    console.log('DELETE on /reviews/:id');
    res.status(501).send('Coming soon!');
});

// ----------------------------------------------------------- //
////////////////////// TOPIC MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/topics', (req,res) => {
    console.log('GET on /topics');
    res.status(501).send('Coming soon!');
});

app.post('/v1/topics', (req,res) => {
    console.log('POST on /topics');
    res.status(501).send('Coming soon!');
});

app.get('/v1/topics/:id', (req,res) => {
    console.log('GET on /topics/:id');
    res.status(501).send('Coming soon!');
});

app.put('/v1/topics/:id', (req,res) => {
    console.log('PUT on /topics/:id');
    res.status(501).send('Coming soon!');
});

app.delete('/v1/topics/:id', (req,res) => {
    console.log('DELETE on /topics/:id');
    res.status(501).send('Coming soon!');
});

// ----------------------------------------------------------- //
/////////////////////// PEER MANAGEMENT /////////////////////////
// ----------------------------------------------------------- //
app.get('/v1/peer', (req,res) => {
    console.log('GET on /peer');
    res.status(501).send('Coming soon!');
});

app.listen(PORT, () => console.log('SE2-Project at port: '+ PORT));