// To load header and footer
$("#header").load("header.html");
$("#footer").load("footer.html");

// Scroll to top of the page
$('html, body').animate({
    scrollTop: 0
}, 'fast');

// insert 'active' class in in proper navbar item
window.addEventListener('load', function() {
    path = document.location.pathname;
    page = path.split("/").pop();

    var filename = page.split(".").shift();
    $('#' + filename).addClass("active");
});

const reset_btn = $('#form1-btn-reset');

reset_btn.click(() => {
    location.reload();
});

const button = $('#form1-btn');

button.click((event) => {
    console.log('Hello 1');
    const num = document.querySelector('#numOfEle').value;
    const sb = document.querySelector('#choice1');
    const node = document.querySelector('#form2Id');
    node.innerHTML = '';

    event.preventDefault();

    choice = sb.value;
    console.log(num);

    if (num) {
        node.innerHTML = '<input class="form-control" type="text" placeholder="URL" aria-label="default input example" id="url" required>'
        console.log('Hello 2');
        for (let i = 1; i <= num; i++) {
            node.innerHTML += `<input class="form-control label" type="text" placeholder="Label for Column ${i}" aria-label="default input example" id="label${i}" required>`;
            node.innerHTML += `<input class="form-control selector" type="text" placeholder="Selector / XPath ${i}" aria-label="default input example" id="selector${i}" required>`;
        }

        node.innerHTML += `<button type="button" class="btn btn-primary" id="form2-btn">Submit</button>`;

        const scrap_btn = document.querySelector('#form2-btn');
        $('#form2-btn').click(function() {
            let url = 'http://localhost:8000/scrap';

            selectors = [];
            labels = [];

            $('.selector').each(function(i, ele) {
                selectors.push($(ele).val());
            })

            $('.label').each(function(i, ele) {
                labels.push($(ele).val());
            })

            tabUrl = document.querySelector('#url').value;

            console.log(tabUrl);
            console.log(labels);
            console.log(selectors);
            console.log(choice);

            let data = {
                choice: choice,
                tabUrl: tabUrl,
                labels: labels,
                selectors: selectors
            }

            console.log(data)

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
                $('.download-div').html('<form action="http://localhost:8000/download" method="get"><input type="submit" value="Download" class="btn btn-primary"> </form>')
            })
        });
    } else {
        location.reload();
    }
});