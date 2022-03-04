const spawn = require('child_process').spawn;

// Initialise the data
const data = {
    url: 'https://www.imdb.com/chart/top/',
    array: ['#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(9) > div > div > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.a-section.a-spacing-none.s-padding-right-small.s-title-instructions-style > h2 > a > span#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div > div > div > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.a-section.a-spacing-none.s-padding-right-small.s-title-instructions-style > h2 > a > span']
}

// We need to stringify the data as
// python cannot directly read JSON
// as command line argument.
let stringifiedData = JSON.stringify(data);

// Call the python process and pass the
// data as command line argument.
const py = spawn('python', ['arraysum.py', stringifiedData]);

resultString = '';

// As the stdout data stream is chunked,
// we need to concat all the chunks.
py.stdout.on('data', function (stdData) {
resultString += stdData.toString();
});

py.stdout.on('end', function () {

// Parse the string as JSON when stdout
// data stream ends
let resultData = JSON.parse(resultString);

let sum = resultData['sum'];
console.log('Sum of array from Python process =', sum);
});
