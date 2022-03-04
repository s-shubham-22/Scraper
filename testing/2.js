const spawn = require('child_process').spawn;

// Initialise the data
const data = {
    url: 'https://www.flipkart.com/search?q=keayboard&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off',
    selectors: ['#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > a.s1Q9rs', '#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > a._8VNy32 > div._25b18c > div._30jeq3'],
    labels: ['Label 1', 'Label 2'],
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}

// We need to stringify the data as
// python cannot directly read JSON
// as command line argument.
let stringifiedData = JSON.stringify(data);

// Call the python process and pass the
// data as command line argument.
const py = spawn('python', ['1.py', stringifiedData]);

resultString = '';

// As the stdout data stream is chunked,
// we need to concat all the chunks.
py.stdout.on('data', function (stdData) {
    // console.log(stdData.toString())
    resultString += stdData.toString();
});

py.stdout.on('end', function () {
    console.log(resultString)
// Parse the string as JSON when stdout
// data stream ends
let resultData = JSON.parse(resultString);
console.log(resultData)
// console.log('Sum of array from Python process =', sum);
});
