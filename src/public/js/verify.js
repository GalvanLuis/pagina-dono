const form = document.getElementById("refusedEmail");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // evita que se envíe el formulario
    const data = window.location.pathname.split('/')[2];
    window.location.href = '/retry_verifycation/' + data
});