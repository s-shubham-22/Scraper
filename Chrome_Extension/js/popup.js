console.log("Popup.js Loaded");

$('.scrap-btn').click(async function() {
    url = 'http://localhost:8000/scrap';

    let data = {
        url: 'https://www.flipkart.com/search?q=keayboard&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off',
        selectors: ['#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > a.s1Q9rs', '#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > a._8VNy32 > div._25b18c > div._30jeq3'],
        labels: ['Label 1', 'Label 2'],
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    fetch(url, fetchData).then(res => {
        console.log('Hello World')
        $('.download-div').html('<form action="http://localhost:8000/download" method="get"><input type="submit" value="Download" class="download"> </form>')
    })
})