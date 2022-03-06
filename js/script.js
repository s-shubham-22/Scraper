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

const button = document.querySelector('#form1-btn');
button.onclick = (event) => {
    var choice = 0;
    const num = document.querySelector('#numOfEle').value;
    const sb = document.querySelector('#choice1');
    const node = document.querySelector('#form2Id');

    node.innerHTML = '';

    event.preventDefault();

    choice = sb.selectedIndex;

    node.innerHTML = '<input class="form-control" type="text" placeholder="URL" aria-label="default input example" id="url" required>'

    for (let i = 1; i <= num; i++) {
        node.innerHTML += `<input class="form-control label" type="text" placeholder="Label for Column ${i}" aria-label="default input example" id="label${i}" required>`;
        node.innerHTML += `<input class="form-control selector" type="text" placeholder="Selector / XPath ${i}" aria-label="default input example" id="selector${i}" required>`;
    }

    node.innerHTML += `<button type="button" class="btn btn-primary" id="form1-btn">Submit</button>`;
};