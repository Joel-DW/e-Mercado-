
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById('formulario').addEventListener('submit', (evento)=> {
        evento.preventDefault();
        location.href = "./index.html";
        sessionStorage.setItem("logueado", true);
        
        var campoUsername = document.getElementById("name-usuario").value;
        
        localStorage.setItem("userName", campoUsername);
        
        return true;
    })
});