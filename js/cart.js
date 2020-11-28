let pCount = document.getElementsByClassName('cantidad');
let pUnitCost = document.getElementsByClassName('costoxunit');
let subtotales = document.getElementsByClassName('resultadoSubtotal');
let monedas = document.getElementsByClassName('moneda');

$('#comprar').attr("disabled", true);

const valorDolar = 40;

function opSubtotales() {
    let dolares = 0;

    for (let i = 0; i < pUnitCost.length; i++) {

        subtotales[i].innerHTML = pUnitCost[i].innerHTML * pCount[i].value;
        if (monedas[i].innerHTML === "UYU") {
            dolares += parseInt(subtotales[i].innerHTML) / valorDolar;
        } else {
            dolares += parseInt(subtotales[i].innerHTML);
        }
    }
    document.getElementById('subtotal').innerHTML = dolares;

    return dolares;
}

function mostrarProductos() {
    fetch(CART2).then(response => {
        return response.json();
    }).then(datos => {
        let indice = datos.articles;

        for (let i = 0; i < indice.length; i++) {

            let htmlContentToAppend = "";

            htmlContentToAppend =
                `
            <tr class="tablerows">
                <th scope="row"><div class="imagen-producto"><img src="`+ indice[i].src + `"></div></th>
                <td>`+ indice[i].name + `</td>
                <td><input type="number" min="1" value="`+ indice[i].count + `" class="cantidad form-control col-3" id="inputCount" onchange="opSubtotales(), sumarEnvio()"></td>
                <td class="costoxunit">` + indice[i].unitCost + `</td>
                <td class="moneda">`+ indice[i].currency + `</td>
                <td class="resultadoSubtotal"></td>
            </tr>
            `
                ;

            document.getElementById('contenedor').innerHTML += htmlContentToAppend;
            subtotales[i].innerHTML += indice[i].unitCost * indice[i].count;
            document.getElementById('subtotal').innerHTML = opSubtotales();
        }
    });
};

const quinceporciento = 15 / 100;
const sieteporciento = 7 / 100;
const cincoporciento = 5 / 100;

function sumarEnvio() {
    let subtotalValue = parseInt(document.getElementById('subtotal').innerHTML);
    let redondeo = Math.round(subtotal);
    let resultado = parseInt(document.getElementById('subtotal').innerHTML);

    if (document.getElementById('opcion1').checked) {
        subtotalValue * quinceporciento;
        resultado + redondeo;
        document.getElementById('totalmasenvio').innerHTML = resultado + " USD";
    }
    if (document.getElementById('opcion2').checked) {
        subtotalValue * sieteporciento;
        resultado + redondeo;
        document.getElementById('totalmasenvio').innerHTML = resultado + " USD";
    }
    if (document.getElementById('opcion3').checked) {
        subtotalValue * cincoporciento;
        resultado + redondeo;
        document.getElementById('totalmasenvio').innerHTML = resultado + " USD";
    }
}
const cardRegEx = /(^\d{14}$)|(^\d{16}$)/;
const codeRegEx = /^\d{3}$/;
const textRegEx = /^[a-zA-ZñáéíóúÁÉÍÓÚ]{3,14}$/;
const adrRegEx = /^[0-9a-zA-ZñáéíóúÁÉÍÓÚ]{3,14}$/;

let mensajeBox = document.getElementById('mensaje');
let mensajeBox2 = document.getElementById('mensaje2');
let mensajeBox3 = document.getElementById('mensaje3');
let mensajeBox4 = document.getElementById('mensaje4');
let mensajeBox5 = document.getElementById('mensaje5');

function verificarDatos() {
    let cardInput = document.getElementById('card');
    let codeInput = document.getElementById('code');
    let clientNameInput = document.getElementById('client-name');
    let clientSurnameInput = document.getElementById('client-surname');
    let clientAddressInput = document.getElementById('client-address');

    document.getElementById('chequear-btn').addEventListener('click', ()=>{ 
        if (cardRegEx.test(cardInput.value)) {
            mensajeBox.innerHTML = `<span style="color:green;">Correcto</span>`;
        } else {
            mensajeBox.innerHTML = `<span style="color:red;">Incorrecto</span>`;
        }
        if (codeRegEx.test(codeInput.value)) {
            mensajeBox2.innerHTML = `<span class="text-success">Correcto</span>`;
        } else {
            mensajeBox2.innerHTML = `<span class="text-danger">Código incorrecto, 
            el código de seguridad es de tres dígitos y se encuentra detras de la tarjeta.</span><br><br>`;
        }
        if (textRegEx.test(clientNameInput.value)) {
            mensajeBox3.innerHTML = `<span style="color:green;">Correcto</span>`;
        } else {
            mensajeBox3.innerHTML = `<span style="color:red;">Debe ingresar su nombre.</span><br><br>`;
        }
        if (textRegEx.test(clientSurnameInput.value)) {
            mensajeBox4.innerHTML = `<span style="color:green;">Correcto</span>`;
        } else {
            mensajeBox4.innerHTML = `<span style="color:red;">Debe ingresar su apellido.</span><br><br>`;
        }
        if (adrRegEx.test(clientAddressInput.value)) {
            mensajeBox5.innerHTML = `<span style="color:green;">Correcto</span>`;
        } else {
            mensajeBox5.innerHTML = `<span style="color:red;">Debe ingresar su dirección.</span><br><br>`;
        }
        if(adrRegEx.test(clientAddressInput.value) && textRegEx.test(clientSurnameInput.value) &&
        textRegEx.test(clientNameInput.value) && codeRegEx.test(codeInput.value) &&
        cardRegEx.test(cardInput.value)){
            sumarEnvio()
            $('#comprar').attr("disabled", false);
        }
    })
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {
    mostrarUser();
    mostrarProductos();
    verificarDatos();
    cerrarSesion();
});