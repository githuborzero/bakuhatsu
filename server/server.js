const express = require('express');
const path = require('path');
const app = express();

// this is for linting
const Console = console;

// use port 80 for production, 5000 for development
const port = 5000;

// api root
const api = '/api';

// start server
app.listen(port, () => {
    Console.log(`Server started on port ${port}`);
});

// main webpage
// comment out app.get('/', ...) for testing the api by itself
app.use(express.static(path.join(__dirname, '/../build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// root of api
app.get(api, (req, res) => {
    res.send({
        title: "Filler JSON",
        body: "this is a filler json object"
    });
});