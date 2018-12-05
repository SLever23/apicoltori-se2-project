const api = require('./api.js');
const app = api.app;
var server;

const PORT = process.env.PORT || 3000;

beforeAll(() => {
    server = app.listen(PORT);
})


afterAll(() => {
    server.close();
})

test('Simple test', () => {
})