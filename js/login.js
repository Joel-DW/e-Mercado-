//    PRUEBA DE VALIDACION DESDE JS
//console.log(document.getElementById('correo').value);
//console.log(document.getElementById('contraseña').value)



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById('formulario').addEventListener('submit', (evento)=> {
        evento.preventDefault();
        location.href = "./index.html";
        sessionStorage.setItem("logeado", true);
        return true;
    })
});