const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const cors = require('cors');

// this is for linting
const Console = console;

// use port 80 for production, 5000 for development
const port = 5000;

// api root
const api = '/api';

// initailize db
let weedDb = mysql.createConnection({
    host: 'localhost',
    user: 'weedUser',
    password: '123',
    database: 'weed'
});
weedDb.connect();

// start server
app.listen(port, () => {
    Console.log(`Server started on port ${port}`);
});

// main webpage
// comment out app.get('/', ...) for testing the api by itself
app.use(express.static(path.join(__dirname, '/../public')));
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get(api + '/emotions', cors(), (request, response) => {
    weedDb.query('SELECT DISTINCT emotion_name FROM Emotions', (err, res) => {
        if (err) Console.log(err);
        response.send(res);
    });
});

app.get(api + '/strains/byemotion', cors(), (request, response) => {
    let emotions = JSON.parse(request.query.array)
    let query = 'SELECT DISTINCT Strains.id, Strains.strain, Strains.price, Strains.type FROM Strains LEFT JOIN Emotion_Strains ON Strains.id = Emotion_Strains.Strains_id LEFT JOIN Emotions ON Emotions.id = Emotion_Strains.Emotions_id WHERE';
    for (let i = 0; i < emotions.length; i++) {
        query += " Emotions.emotion_name = ?";
        if (i != emotions.length - 1) {
            query += " OR"
        } else {
            query += ";";
        }
    }
    weedDb.query(query, emotions, (err, res) => {
        if (err) Console.log(err);
        response.send(res);
    });
});

app.get(api + '/decks', cors(), (request, response) => {
    weedDb.query('SELECT DISTINCT deck_name FROM Decks', (err, res) => {
        if (err) Console.log(err);
        response.send(res);
    });
});

app.get(api + '/strains/bydeck/:deck', cors(), (request, response) => {
    let deck = request.params.deck;

    let query = "SELECT DISTINCT Strains.id, Strains.strain FROM Strains LEFT JOIN Deck_Strains ON Strains.id = Deck_Strains.Strains_id LEFT JOIN Decks ON Decks.id = Deck_Strains.Decks_id WHERE Decks.deck_name = '" + deck + "';";
    weedDb.query(query, (err, res) => {
        if (err) Console.log(err);
        response.send(res);
    });
});

app.get(api + "/deck/add/:name", cors(), (request, response) => {
    let deck = request.params.name;
    let QUERY = 'INSERT INTO Decks (deck_name) VALUES (?);';
    weedDb.query(QUERY, deck, (err, res) => {
        if (err) Console.log(res);
        QUERY = 'SELECT id FROM Decks WHERE deck_name = ?;';
        weedDb.query(QUERY, deck, (err, res) => {
            if (err) Console.log(res);
            let deck_id = res[0].id;
            let emotions = JSON.parse(request.query.array);
            QUERY = 'INSERT INTO Deck_Strains (Decks_id, Strains_id) VALUES';
            for (let i = 0; i < emotions.length; i++) {
                QUERY += " (" + deck_id + ", ?)";
                if (i != emotions.length - 1) {
                    QUERY += ","
                } else {
                    QUERY += ";";
                }
            }
            weedDb.query(QUERY, emotions, (err, res) => {
                if (err) Console.log(res);
                response.send(res);
            });
        });
    });
})


app.get(api + "/deck/delete/:name", cors(), (request) => {
    let deck = request.params.name;
    let QUERY = 'SELECT id FROM Decks WHERE deck_name = ?;';
    weedDb.query(QUERY, deck, (err, res) => {
        if (err) Console.log(res);
        let deck_id = res[0].id;
        QUERY = 'DELETE FROM Deck_Strains WHERE Decks_id = ?;';
        weedDb.query(QUERY, deck_id, (err, res) => {
            if (err) Console.log(res);
        });
        QUERY = 'DELETE FROM Decks WHERE deck_name = ?;';
        weedDb.query(QUERY, deck, (err, res) => {
            if (err) Console.log(res);
        });
    });
})

app.get(api + "/strain/delete/:deck/:strain", cors(), (request) => {
    let deck = request.params.deck;
    let strain_id = request.params.strain;
    let QUERY = 'SELECT id FROM Decks WHERE deck_name = ?;';
    weedDb.query(QUERY, deck, (err, res) => {
        if (err) Console.log(res);
        let deck_id = res[0].id;
        let QUERY = "DELETE FROM Deck_Strains WHERE Strains_id = " + strain_id + " AND Decks_id = " + deck_id + ";";
        weedDb.query(QUERY, (err, res) => {
            if (err) Console.log(res);
        });
    });
})

app.get(api + "/deck/update/:deck/:name", cors(), (request) => {
    let newName = request.params.name;
    let oldDeck = request.params.deck;
    let QUERY = "UPDATE Decks SET deck_name = '" + newName + "' WHERE deck_name = '" + oldDeck + "';";
    weedDb.query(QUERY, (err, res) => {
        if (err) Console.log(res);
    });
})





