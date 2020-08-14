getJSONData(PRODUCTS_URL).then(function(datos){
    console.log(datos);
    for (let i=0; i < datos.data.length; i++){
    document.getElementById('pro-list-container').innerHTML +=
     `<div class="contenedor">`+
        `<h2 class="nombre">`+ datos.data[i].name +`</h2>` + 
        `<div class="cantVendidos">`+ `Vendidos: `+ datos.data[i].soldCount+`</div>`+
     `</div>`+
     `<div class="imagenDescrip">`+
        `<img src="`+datos.data[i].imgSrc+`">`+
        `<p class="descripcion">`+ datos.data[i].description+ `</p>`+ `<br><br>`+
     `</div>`+
     `<div class="precio">`+ `Precio: `+ datos.data[i].currency+ ` `+datos.data[i].cost+
     `</div>`
     ;
    }
})    

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});
