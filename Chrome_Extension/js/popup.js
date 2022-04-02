console.log("Popup.js Loaded");
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };

    let [tab] = await chrome.tabs.query(queryOptions);
    localStorage.setItem('tabname', tab);
    return tab;
}

getCurrentTab()
    .then((data) => {
        window.tabUrl = data.url;
    })


$('.form1-btn').click(function() {
    window.choice = $('#form1-dropdown').val();
    let numOfEle = $('#form1-num').val();

    $('#form-2').html('');
    $('.download-div').html('');

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

    // console.log('This is Current URL: ', window.tabUrl);
    // console.log(choice)
    let url = 'http://localhost:8000/scrap';
    // window.url = ''
    // if (window.choice === '1') {
    //     window.url = 'http://localhost:8000/scrapSelector';
    //     console.log('In 1')
    // } else if (window.choice === '2') {
    //     window.url = 'http://localhost:8000/scrapXpath';
    //     console.log('In 2')
    // }

    console.log(url)

    selectors = [];
    labels = [];

    $('.selector').each(function(i, ele) {
        selectors.push($(ele).val());
    })

    $('.label').each(function(i, ele) {
        labels.push($(ele).val());
    })

    tabUrl = window.tabUrl

    console.log(tabUrl);
    console.log(labels);
    console.log(selectors);
    console.log(choice);

    let data = {
        choice: window.choice,
        tabUrl: tabUrl,
        labels: labels,
        selectors: selectors
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
        console.log('Scraping Done')
        $('.download-div').html('<form action="http://localhost:8000/download" method="get"><input type="submit" value="Download" class="download"> </form>')
    })
})