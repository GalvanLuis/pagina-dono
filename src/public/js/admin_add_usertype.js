var userModal = document.getElementById('confirmAdd');
userModal.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    var button = event.relatedTarget
    // Extract info from data-bs-* attributes
    var name = button.getAttribute('data-bs-name');
    var idu = button.getAttribute('data-bs-id');
    var userType = button.getAttribute('data-bs-usertype');
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    
    var nameUser = userModal.querySelector('.modal-body span');
    var idUser = userModal.querySelector('.modal-footer input');
    var form = userModal.querySelector('.modal-footer form');

    nameUser.textContent = name;
    idUser.value = idu;
    form.action = form.action + '?id=' + idu + '&tu=' + userType;
});