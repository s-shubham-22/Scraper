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
    filename = page.split(".").shift();
    $("#" + filename).addClass("active");
})

const btn = $('#form1-btn');
const sb = $('#choice1');
const num = $('#numOfEle');

var choice = 0;
btn.onclick = (event) => {
    event.preventDefault();
    // show the selected index
    choice = sb.selectedIndex;
    if (choice === 1) {
        // for (let i = 1; i <= num; i++) {
        //     console.log('Hello');
        //     // $('#formId').append(`<input class="form-control" type="text" placeholder="Label for Column" aria-label="default input example" id="label${i}">
        //     // <input class="form-control" type="text" placeholder="Selector" aria-label="default input example" id="selector${i}">`)
        // }
    } else {
        alert('You have choosen web scraping using XPath');
    }
};