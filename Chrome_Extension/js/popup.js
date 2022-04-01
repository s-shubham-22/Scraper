console.log("Popup.js Loaded");
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };

    let [tab] = await chrome.tabs.query(queryOptions);
    localStorage.setItem('tabname', tab);
    return tab;
}

getCurrentTab()
    .then((data) => {
        console.log('newdata', data.url);
        window.tabUrl = data;
    })
    .then(() => { console.log('error') });

console.log('This is Current URL: ', window.tabUrl);

$('.form1-btn').click(function() {
    let choice = $('#form1-dropdown').val();
    let numOfEle = $('#form1-num').val();

    $('#form-2').html('');

    for (let i = 1; i <= numOfEle; i++) {
        let ele = `<div class="data">

        <input type="text" name="label${i}" id="" class="label" placeholder="Lable ${i}">
        <input type="text" name="selector${i}" id="" class="selector" placeholder="Selector ${i}">
    </div>`;
        $('#form-2').append(ele);
    }
    $('#form-2').append('<input type="button" value="Scrap" class="scrap-btn">')
})

$(document).on('click', '.scrap-btn', async function() {

    url = 'http://localhost:8000/scrap';

    selectors = [];
    labels = [];

    $('.selector').each(function(i, ele) {
        selectors.push($(ele).val());
    })

    $('.label').each(function(i, ele) {
        labels.push($(ele).val());
    })

    tabUrl = 'https://www.flipkart.com/search?q=keayboard&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'

    console.log(tabUrl);
    console.log(labels);
    console.log(selectors);

    let data = {
        tabUrl: tabUrl,
        selectors: selectors,
        labels: labels,
    }

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    fetch(url, fetchData).then(res => {
        console.log(res);
        console.log('Hello World')
        $('.download-div').html('<form action="http://localhost:8000/download" method="get"><input type="submit" value="Download" class="download"> </form>')
    })
})