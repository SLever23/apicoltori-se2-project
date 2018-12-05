beforeAll(() => {
    let PORT = process.env.PORT || 3000;
    server = app.listen(PORT, () => {});
});

afterAll(() => {
    server.close();
});