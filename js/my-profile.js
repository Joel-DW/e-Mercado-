var guardarCambiosBtn = document.getElementById('guardarcambios');

var nameRegex = /^/;
var surnameRegex = /^/;
var telRegex = /^/;
var emailRegex = /^/;
var edadRegex = /^/;

function editarDatos(){
    guardarCambiosBtn.addEventListener('click', (e)=>{
        var valorNombre = document.getElementById('nombre').value;
        var valorApellido = document.getElementById('apellido').value;
        var valorTel = document.getElementById('telefono').value;
        var valorEmail = document.getElementById('correo').value;
        var valorEdad = document.getElementById('edad').value;
        var valorLoc = document.getElementById('localidad').value;
        var valorDir = document.getElementById('direccion').value;

        var datosUsuario = {
            name: valorNombre,
            surname: valorApellido,
            tel: valorTel,
            email: valorEmail,
            age: valorEdad,
            location: valorLoc,
            address: valorDir
        }
        if (nameRegex.test(valorNombre) &&
             surnameRegex.test(valorApellido) && 
             telRegex.test(valorTel) && 
             emailRegex.test(valorEmail) && 
             edadRegex.test(valorEdad)) {
                localStorage.setItem('user-data', JSON.stringify(datosUsuario));
                location.reload();
            }  else {
                 alert('Debe llenar los campos correctamente!');
            }
    })
};

function mostrarDatosUsuario(){
    var dataUser = JSON.parse(localStorage.getItem('user-data'));

    var campoName = document.getElementById('box-name');
    var campoSurname = document.getElementById('box-surname');
    var campoAge = document.getElementById('box-age');
    var campoTel = document.getElementById('box-tel');
    var campoEmail = document.getElementById('box-email');
    var campoLocation = document.getElementById('box-loc');
    var campoAddress = document.getElementById('box-adr');

    campoName.innerHTML = dataUser.name;
    campoSurname.innerHTML = dataUser.surname;
    campoAge.innerHTML = dataUser.age;
    campoEmail.innerHTML = dataUser.email;
    campoTel.innerHTML = dataUser.tel;
    campoAddress.innerHTML = dataUser.address;
    campoLocation.innerHTML = dataUser.location;

    $(document).ready(function() {
        $('#campoName').addClass('bg-light');
        $('#campoSurname').addClass('bg-light');
        $('#campoAge').addClass('bg-light');
        $('#campoEmail').addClass('bg-light');
        $('#campoTel').addClass('bg-light');
        $('#campoAddress').addClass('bg-light');
        $('#campoLocation').addClass('bg-light');
    })
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {
    editarDatos();
    mostrarDatosUsuario();
    mostrarUser();
    cerrarSesion();
});