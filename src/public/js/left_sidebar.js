const button = document.getElementById("lsidebar-button");
const contents = document.getElementsByClassName("lsidebar-tab");
const contents_w = document.getElementsByClassName("lsidebar");

function toggleSidebar() {
    contents_w[0].classList.toggle("hidden");
    for (var i = 0; i < contents.length; i++) {
        var elemento = contents[i];
        elemento.classList.toggle("hidden");
    }
}

button.addEventListener('click', toggleSidebar);

window.addEventListener('resize', function() {
    if (window.innerWidth < 768) { // Cambia el valor 768 por el ancho de pantalla deseado
        contents_w[0].classList.add("hidden");
        for (var i = 0; i < contents.length; i++) {
            var elemento = contents[i];
            elemento.classList.add("hidden");
        }
    } else {
        contents_w[0].classList.remove("hidden");
        for (var i = 0; i < contents.length; i++) {
            var elemento = contents[i];
            elemento.classList.remove("hidden");
        }
    }
});
