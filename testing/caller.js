const spawn = require('child_process').spawn;

// Initialise the data
const data = {
array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
