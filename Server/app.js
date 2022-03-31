const express = require('express');
const spawn = require('child_process').spawn;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const app = express();

app.use(express.json({ limit: '1mb' }));

app.post('/scrap', (req, res) => {
    console.log(req.body);

    data = req.body;

    let stringifiedData = JSON.stringify(data);

    // Call the python process and pass the
    // data as command line argument.
    const py = spawn('python', ['scrap.py', stringifiedData]);

    resultString = '';

    // As the stdout data stream is chunked,
    // we need to concat all the chunks.
    py.stdout.on('data', function(stdData) {
        // console.log(stdData.toString())
        resultString += stdData.toString();
    });

    py.stdout.on('end', function() {
        console.log('Python process exited.');
        res.send('Data Scraped');
    })
});


app.get('/download', (req, res) => {
    res.download('Scraped_data.csv');
})


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});