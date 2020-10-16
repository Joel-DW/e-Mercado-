const CART2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let valoresCantidad = document.getElementsByClassName('valorInput');
let precioxUnidad = document.getElementsByClassName('costoxunit');
let subtotales = document.getElementsByClassName('resultadoSubtotal');

let monedas = document.getElementsByClassName('moneda');

function opSubtotales(){
    let total = 0;
    let dolares = 0;
    
    for(let i=0; i<precioxUnidad.length; i++){
        subtotales[i].innerHTML = precioxUnidad[i].innerHTML * valoresCantidad[i].value;
        if (monedas[i].innerHTML === "UYU"){
            
            dolares += parseInt(subtotales[i].innerHTML) / 40;
        }else{
            dolares += parseInt(subtotales[i].innerHTML);
            console.log(dolares);
        }
        total += parseInt(subtotales[i].innerHTML); 
        
    }
    document.getElementById('total').innerHTML = dolares;
    console.log(parseInt(dolares));

    return dolares;

    let subtotal = valorCantidad*precioxUnidad;
document.getElementById('resultadoSubtotal').innerHTML = subtotal;
}


function mostrarProductos(){
    fetch(CART2).then(response => {
        return response.json();
    }).then(datos => {
            let indice = datos.articles;
        
            for(let i=0; i < indice.length; i++){

            let htmlContentToAppend = "";

            htmlContentToAppend = 
            `<div class="contenedor10">`+
                `<div><img src="`+ indice[i].src + `" class="productsImg"></div>` +
                `<table class="tabla">`+
                    `<tr>`+
                        `<th>Producto</th>`+
                        `<th>Cantidad</th>`+
                        `<th>Precio unitario</th>`+
                        `<th>Moneda</th>`+
                        `<th>Subtotal</th>`+
                    `</tr>`+
                    `<tr>`+
                        `<td>`+ indice[i].name +`</td>`+
                        `<td>`+ `<input type="number" min="1" value="`+ indice[i].count +`" class="valorInput" id="inputCount" onchange="opSubtotales()">` + `</td>`+
                        `<td class="costoxunit">` + indice[i].unitCost + `</td>`+
                        `<td class="moneda">`+ indice[i].currency + `</td>`+
                        `<td class="resultadoSubtotal"></td>`+
                    `</tr>`+
                `</table>`+
            `</div>`;

            
            document.getElementById('contenedor').innerHTML += htmlContentToAppend;
            subtotales[i].innerHTML += indice[i].unitCost*indice[i].count;
            document.getElementById('total').innerHTML = opSubtotales();
            }

        });
        
};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    mostrarProductos();
    //document.getElementsByClassName('inputCount').addEventListener("change", myScript){



});