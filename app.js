const express = require('express');
const app = express();

app.use(express.static('scraper'));

app.get('/', (req, res) => {
    res.sendFile('./scraper/index.html');
});

app.get('/letsscrap', (req, res) => {
    res.sendFile('./scraper/letsscrap.html');
});

app.get('/howto', (req, res) => {
    res.sendFile('./scraper/howto.html');
});

app.get('/about', (req, res) => {
    res.sendFile('./scraper/about.html');
});

app.get('/contact', (req, res) => {
    res.sendFile('./scraper/contact.html');
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
})