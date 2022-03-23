const express = require('express');
const app = express();

app.use(express.static('scraper'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/letsscrap', (req, res) => {
    res.sendFile(__dirname + '/letsscrap.html');
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
})