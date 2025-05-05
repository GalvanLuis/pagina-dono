function searchUser(listId) {
    const searchTerm = document
        .getElementById("searchInput-" + listId)
        .value.trim()
        .toLowerCase();
    const userList = document.getElementById(listId);
    const container = userList.getElementsByClassName("user-container");

    for (const elem of container) {
        const userName = elem.getElementsByTagName("span");
        const isVisible = userName[0].textContent.toLowerCase().includes(searchTerm);

        elem.style.display = isVisible ? "block" : "none";
    }

}

const Handlebars = require('handlebars');

Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});