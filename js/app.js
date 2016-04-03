window.addEventListener("load", function () {
    window.pageNav = {};
    pageNav.elements = {};
    pageNav.currentPage = "home";

    pageNav.elements = {};
    pageNav.elements.content = document.getElementById("content");
    pageNav.elements.title = document.getElementsByTagName("title")[0];

    pageNav.links = document.getElementsByTagName("a");
    for (i = 0; i < pageNav.links.length; i++) {
        console.log(i);
        if (pageNav.links[i].getAttribute("data-url") != null) {
            console.log(i + "Attached");
            pageNav.links[i].addEventListener('click', function (evt) {
                
                var url = this.getAttribute("data-url");
                evt.preventDefault();
                pageNav.loadPage(url)
            });
        }

    }



    pageNav.loadPage = function (url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                var response = JSON.parse(xhttp.responseText);

                console.log(response);
                pageNav.elements.content.innerHTML = response.content;
                pageNav.elements.title.innerHTML = response.title;
                history.pushState("test", response.title, response.path);

            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }
});
