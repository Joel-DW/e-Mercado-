var urlParametro = window.location.search.substring(1);
var marcayModelo = urlParametro.replace('%20', ' ');
var marcayModeloGlobal = marcayModelo.replace('%20', ' ');

function showInfo() {
    fetch(PRODUCT_INFO_URL).then(response => {
        return response.json();
    })
        .then(datos => {
            let htmlContentToAppend = "";

            arrayRelacionados = datos.relatedProducts;
            console.log(arrayRelacionados);

            htmlContentToAppend +=
                `<div class="contenedor1">` +
                `<h2 class="nombre">` + marcayModeloGlobal + `</h2>` +
                `<div class="categoria">` + `Categoría: ` + datos.category + `</div>` +
                `<div class="imagenDesc2">` + `<img src="` + datos.images[0] + `">` +
                `<p class="descripcion">` + datos.description + `</p>` +
                `</div>` +
                `<div class="precioyVendidos">` +
                `<div class="precio">` + "Precio:" + datos.cost + datos.currency + `</div>` +
                `<div class="vendidos">` + "Total Vendidos:" + datos.soldCount + `</div>` +
                `</div>` +
                `<div class="slider">` +
                    `<ul>` +
                        `<li><img src="` + datos.images[1] + `" alt="foto del vehiculo 1"></li>` +
                        `<li><img src="` + datos.images[2] + `" alt="foto del vehiculo 2"></li>` +
                        `<li><img src="` + datos.images[3] + `" alt="foto del vehiculo 3"></li>` +
                        `<li><img src="` + datos.images[4] + `" alt="foto del vehiculo 4"></li>` +
                    `</ul>` +    
                `</div>`+
                `<hr>`+
                `<div class="contenedorAC">`+
                    `<button type="submit" value="Añadir al carrito" class="addCarrito" id="añadirCarrito">Añadir al carrito `+
                    `<img src="img/shopping-cart.png" class="img-cart">`+ `</button>`+
                `</div>`
                

                ;

            document.getElementById("info-container").innerHTML = htmlContentToAppend;
            
            document.getElementById('añadirCarrito').addEventListener('click', (evento)=> {
                evento.preventDefault();
                location.href = "./cart.html";
            });

            fetch(PRODUCTS_URL).then(response => {
                return response.json();
            })
                .then(datos => {
                    for (let i = 0; i < datos.length; i++) {
                        let htmlContentToAppend3 = "";
                        if (arrayRelacionados.includes(i)) {
                            console.log(arrayRelacionados.includes(i));
                            htmlContentToAppend3 +=
                                `<hr>` +
                                `<div class="contenedor2">` +
                                    `<h3 class="autoRelacionado"><a href="product-info.html?` + datos[i].name + `">`+ datos[i].name + 
                                    `</a></h3>` +
                                    `<div class="imagenRelacionado">` +
                                        `<img src="` + datos[i].imgSrc + `" alt="Foto del producto">` +
                                        `<p class="relacionadoDescrip">` + datos[i].description + `</p>` + 
                                    `</div>` +
                                    `<div class="precioRelacionado">` + `Precio: ` + datos[i].currency + ` ` + datos[i].cost +
                                    `</div>` +
                                `</div>`+
                                `<hr>`
                                ;
                            document.getElementById('relacionados').innerHTML += htmlContentToAppend3;
                        }
                    }
                });
        })

    
    }
    let arrayRelacionados = "";



    function showComments() {
        fetch(PRODUCT_INFO_COMMENTS_URL).then(response => {
            return response.json();
        })
            .then(data => {
                console.log(data);

                let htmlContentToAppend = "";

                for (let i = 0; i < data.length; i++) {

                    htmlContentToAppend +=

                        `<hr>` +
                        `<div class="commentContainer">` +
                        `<div class="user-comment">` + data[i].user + `</div>` +
                        `<div class="puntaje">` + "Calificación: " + data[i].score + `</div>` +
                        `<div class="comentario">` + data[i].description + `</div>` +
                        `<div class="fecha">` + data[i].dateTime + `</div>` +
                        `</div>` +
                        `<hr>`;
                    document.getElementById("calificaciones").innerHTML = htmlContentToAppend;
                }

            })
    }

    function mostrarUser1() {
        var userName = localStorage.getItem("correo");
        console.log(userName);

        document.getElementById("userComment1").innerHTML = `<span id="userText">` + userName + `</span>`;
    }


    /*    ----------ESTO NO FUNCA, EN BREVE LO TRATO DE CORREGIR------- 
    
    function agregarComentario(){
        var comentario = document.getElementById("commentBox").value;
        console.log(comentario);
        var valoracion = document.getElementById("calific").value;
        console.log(valoracion);
        var usuarioaComentar = localStorage.getItem("correo");
        console.log(usuarioaComentar);
        var fechayHora = new Date();
        console.log(fechayHora);
    
        document.getElementById("newComment").innerHTML += 
            
            `<div class="commentContainer">`+
            `<div class="user-comment">`+ usuarioaComentar + `</div>`+
            `<div class="puntaje">`+ "Calificación: "+ valoracion + `</div>`+
            `<div class="comentario">`+ comentario + `</div>`+
            `<div class="fecha">`+ fechayHora + `</div>`+
            `</div>`;
    }*/


    //Función que se ejecuta una vez que se haya lanzado el evento de
    //que el documento se encuentra cargado, es decir, se encuentran todos los
    //elementos HTML presentes.
    document.addEventListener("DOMContentLoaded", function (e) {
        showInfo();
        showComments();
        mostrarUser1();
        

        /*document.getElementById("enviarComentario").addEventListener("click", function(){
            agregarComentario();
        });*/
    });
