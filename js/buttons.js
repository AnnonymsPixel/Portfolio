let contactBtn = document.getElementById("contact-link")

contactBtn.addEventListener('click', function () {
    var elmnt = document.getElementById("contact-form");
    elmnt.scrollIntoView({
        behavior: "smooth"
    });
})


let githubBtn = document.getElementById("github-link")
githubBtn.addEventListener('click', function () {
    var elmnt = document.getElementById("github");
    elmnt.scrollIntoView({
        behavior: "smooth"
    });
})

let projectsBtn = document.getElementById("projects-link")
projectsBtn.addEventListener('click', function () {
    var elmnt = document.getElementById("projects");
    elmnt.scrollIntoView({
        behavior: "smooth"
    });
})

