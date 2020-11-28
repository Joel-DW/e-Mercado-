const ordenASC_segun_costo = "Menor a mayor precio";
const ordenDESC_segun_costo = "Mayor a menor precio";
const orden_segun_cantidad = "Relevancia";

var allProducts = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let resultado = [];
    if (criteria === ordenASC_segun_costo)
    {
        resultado = array.sort(function(a, b) {
            
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ordenDESC_segun_costo){
        resultado = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === orden_segun_cantidad){
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
    for(let i = 0; i < allProducts.length; i++){
        let products = allProducts[i];
        let productName = products.name.split(" ");
        
        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){
            
                htmlContentToAppend += `
                <div class="card" style="width: 18rem;">
                    <a href="product-info.html?marca=`+ productName[0] +`&modelo=`+ productName[1] +`">
                    <img class="card-img-top" src="`+ products.imgSrc +`" alt="Card image cap"/></a>
                    <div class="card-body">
                        <h5 class="card-title">`+ products.name +`</h5>
                        <p class="card-text">`+ products.description +`</p>
                    </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">`+ products.currency + " " + products.cost +`</li>
                        <li class="list-group-item">Vendidos: `+ products.soldCount +`</li>
                    </ul>
                    <div class="card-body">
                    <button type="button" class="btn btn-primary"><a class="card-boton-link" href="product-info.html?marca=`+ productName[0] +`&modelo=`+ productName[1] +`">Mas info</a></button> 
                    </div>
                </div>`
                ;
            }
            document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
    if(productsArray != undefined){
        allProducts = productsArray;
    }
    allProducts = sortProducts(currentSortCriteria, allProducts);
    //Muestro los productos ordenados
    showProductsList();
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    mostrarUser();
    cerrarSesion();
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ordenASC_segun_costo, resultObj.data);
        }
    });
    document.getElementById("menprec").addEventListener("click", function(){
        sortAndShowProducts(ordenASC_segun_costo);
    });
    document.getElementById("mayprec").addEventListener("click", function(){
        sortAndShowProducts(ordenDESC_segun_costo);
    });
    document.getElementById("relevancia").addEventListener("click", function(){
        sortAndShowProducts(orden_segun_cantidad);
    });
    
    document.getElementById("filtrar").addEventListener("click", function(){
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