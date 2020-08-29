const ORDER_ASC_BY_COST = "Menor a mayor precio";
const ORDER_DESC_BY_COST = "Mayor a menor precio";
const ORDER_BY_PROD_COUNT = "Relevancia";

var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let resultado = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        resultado = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        resultado = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        resultado = array.sort(function(a, b) {
            let aCost = parseInt(a.soldCount);
            let bCost = parseInt(b.soldCount);
            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }
    return resultado;
}

function showProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];
        
        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){
            
                htmlContentToAppend += 
                `<div class="contenedor">`+
                `<h2 class="nombre">`+ products.name +`</h2>` + 
                `<div class="cantVendidos">`+ `Vendidos: `+ products.soldCount+`</div>`+
                `</div>`+
                `<div class="imagenDescrip">`+
                `<img src="`+products.imgSrc+`">`+
                `<p class="descripcion">`+ products.description+ `</p>`+ `<br><br>`+
                `</div>`+
                `<div class="precio">`+ `Precio: `+ products.currency+ ` `+products.cost+
                `</div>`
                ;
            }
            document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;
    }
        
}


function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });
    document.getElementById("menprec").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });
    document.getElementById("mayprec").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });
    document.getElementById("relevancia").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });
    /*document.getElementById("boton1").addEventListener("click", function(){
        document.getElementById("rangoDesde").value = "";
        document.getElementById("rangoHasta").value = "";
        minCost = undefined;
        maxCost = undefined;
        showProductsList();
    });*/
    document.getElementById("boton1").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de articulos por producto.
        minCost = document.getElementById("rangoDesde").value;
        maxCost = document.getElementById("rangoHasta").value;
        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }
        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }
        showProductsList();
    });
});