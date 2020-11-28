function tomarParametrosUrl() {
    var myUrl = window.location.href;
    var url = new URL(myUrl);
    let marca = url.searchParams.get("marca");
    let modelo = url.searchParams.get("modelo");

    document.getElementById('auto').innerHTML += `<h2 class="title bg-primary h2auto">` + marca + " " + modelo + `</h2>`;
}

function showInfo() {
    fetch(PRODUCT_INFO_URL).then(response => {
        return response.json();
    })
        .then(datos => {
            let htmlContentToAppend = "";

            let related = "";

            related = datos.relatedProducts;
            console.log(related);
            console.log(datos);
            htmlContentToAppend +=
                `<div class="contenedor1">
                    <div class="categoria">Categoría: ` + datos.category + `</div>
                    <div class="imagenDesc2">
                        <img src="` + datos.images[0] + `">
                        <p class="descripcion">` + datos.description + `</p>
                    </div>
                    <div class="precioyVendidos">
                        <div class="badge badge-primary m-2 p-2 font-size-50">Precio: ` + datos.cost + datos.currency + `</div>
                        <div class="badge badge-secondary m-2 p-2 font-size-100">Total vendidos: ` + datos.soldCount + `</div>
                    </div>
                    <div class="slider">
                        <ul>
                            <li><img src="` + datos.images[1] + `" alt="foto del vehiculo 1"></li> 
                            <li><img src="` + datos.images[2] + `" alt="foto del vehiculo 2"></li> 
                            <li><img src="` + datos.images[3] + `" alt="foto del vehiculo 3"></li> 
                            <li><img src="` + datos.images[4] + `" alt="foto del vehiculo 4"></li> 
                        </ul>
                </div>
                <hr>
                <div class="contenedorAC">
                    <button type="button" class="btn btn-lg btn-success" value="Añadir al carrito" id="añadirCarrito">Añadir al carrito 
                    <img src="img/carritodecompras.png" class="img-cart"></button>
                </div>`
                ;

            document.getElementById("info-container").innerHTML = htmlContentToAppend;

            document.getElementById('añadirCarrito').addEventListener('click', (evento) => {
                evento.preventDefault();
                location.href = "./cart.html";
            });

            fetch(PRODUCTS_URL).then(response => {
                return response.json();
            })
                .then(datos => {
                    for (let i = 0; i < datos.length; i++) {
                        let htmlContentToAppend3 = "";
                        if (related.includes(i)) {
                            htmlContentToAppend3 +=
                                `
                                <div class="card" style="width: 18rem;">
                                    <a href="product-info.html?`+ datos[i].name + `">
                                    <img src="` + datos[i].imgSrc + `" width="auto" alt="Foto del producto"></a>
                                    <div class="card-body">
                                        <h5 class="card-title">`+ datos[i].name + `</a></h5>
                                        <p class="card-text">`+ datos[i].description + `</p>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">`+ datos[i].currency + " " + datos[i].cost + `</li>
                                    </ul>
                                    <div class="card-body">
                                        <button type="button" class="btn btn-primary"><a class="card-boton-link" href="product-info.html?` + datos[i].name + `">Mas info</a></button> 
                                    </div>
                                </div>`
                                ;
                            document.getElementById('relacionados').innerHTML += htmlContentToAppend3;
                        }
                    }
                });
        })
}

function showComments() {
    fetch(PRODUCT_INFO_COMMENTS_URL).then(response => {
        return response.json();
    })
        .then(data => {
            let htmlContentToAppend = "";

            for (let i = 0; i < data.length; i++) {

                htmlContentToAppend +=

                        `<hr>
                        <div class="commentContainer">
                            <div class="user-comment">` + data[i].user + `</div>
                            <div class="puntaje">Calificación: ` + data[i].score + `</div>
                            <div class="comentario">` + data[i].description + `</div>
                            <div class="fecha">` + data[i].dateTime + `</div>
                        </div>
                        <hr>`;
                document.getElementById("opiniones").innerHTML = htmlContentToAppend;
            }
        })
}

function myComment() {
    var usuarioGuardado = localStorage.getItem("userName");

    document.getElementById("userComment1").innerHTML = usuarioGuardado;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    mostrarUser();
    tomarParametrosUrl();
    showInfo();
    showComments();
    myComment();
    cerrarSesion();
});
