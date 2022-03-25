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

const button = $('#form1-btn');
button.onclick = (event) => {
    var choice = 0;
    const num = document.querySelector('#numOfEle').value;
    const sb = document.querySelector('#choice1');
    const node = document.querySelector('#form2Id');

    node.innerHTML = '';

    event.preventDefault();

    choice = sb.selectedIndex;
    console.log(num);

    if (num) {
        node.innerHTML = '<input class="form-control" type="text" placeholder="URL" aria-label="default input example" id="url" required>'

        for (let i = 1; i <= num; i++) {
            node.innerHTML += `<input class="form-control label" type="text" placeholder="Label for Column ${i}" aria-label="default input example" id="label${i}" required>`;
            node.innerHTML += `<input class="form-control selector" type="text" placeholder="Selector / XPath ${i}" aria-label="default input example" id="selector${i}" required>`;
        }

        node.innerHTML += `<button type="button" class="btn btn-primary" id="form2-btn">Submit</button>`;

        const scrap_btn = document.querySelector('#form2-btn');
        scrap_btn.onclick = (event) => {
            alert("Scraping started");
            const data = { url: $('#url').val() };
            const labels = {};
            const selectors = {};
            for (let i = 1; i <= num; i++) {
                labels[i] = $('#label' + i).val();
                selectors[i] = $('#selector' + i).val();
            }
            data.label = labels;
            data.selector = selectors;

            // let stringifiedData = JSON.stringify(data);

            // const py = spawn('python', ['./scrapFromWebsite.py', stringifiedData]);

            // resultString = '';

            // py.stdout.on('data', function(stdData) {
            //     // console.log(stdData.toString())
            //     resultString += stdData.toString();
            // });

            // py.stdout.on('end', function() {
            //     console.log(resultString)
            //         // Parse the string as JSON when stdout
            //         // data stream ends
            //     let resultData = JSON.parse(resultString);
            //     console.log(resultData)
            //         // console.log('Sum of array from Python process =', sum);
            // });

            console.log(data);
        };
    } else {
        location.reload();
    }
};

// For Position of Footer
// setInterval(() => {
//     if ($(window).height() >= $(document).height()) {
//         $(".container").addClass("footer-fixed");
//     } else {
//         $("#footer").removeClass("footer-fixed");
//     }
// }, 1000)