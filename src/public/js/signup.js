const phoneNumberInput = document.getElementById('sup-phone-number');

phoneNumberInput.addEventListener('input', function (event) {
    // Eliminar todos los caracteres que no sean números y los guiones existentes
    let phoneNumber = this.value.replace(/[^\d-]/g, '').replace(/--+/g, '-');
    
    // Agregar guiones después de los primeros tres y seis dígitos
    if (phoneNumber.length > 3 && phoneNumber.charAt(3) !== '-') {
        phoneNumber = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3);
    }
    if (phoneNumber.length > 7 && phoneNumber.charAt(7) !== '-') {
        phoneNumber = phoneNumber.slice(0, 7) + '-' + phoneNumber.slice(7);
    }
    
    // Actualizar el valor del input
    this.value = phoneNumber;
});

const passwordInput = document.getElementById("pass");
const confirmPasswordInput = document.getElementById("rpass");

function validatePassword() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden");
    } else {
        confirmPasswordInput.setCustomValidity("");
    }
}

passwordInput.addEventListener("change", validatePassword);
confirmPasswordInput.addEventListener("keyup", validatePassword);


function checkCaptcha(x) {
    var response = grecaptcha.getResponse();

    if(response.length == 0){
        var errorDiv = document.getElementById("captcha-error");
        errorDiv.innerHTML = "Por favor, verifica el captcha.";
        return false;
    } else {
        return true;
    }
}