import { createImage } from "../utils/createComponent.js";
import { fetchData } from "../utils/fetcher.js";
import { getAmountCart } from "../utils/gestionCart.js";
import { api } from "../utils/utils.js";

/**
 * Fetch the product from url then fill spaces in page or redirect to main page
 */

const getKanap = async () => {
    getAmountCart();
    
    const id = (new URL(document.location)).searchParams.get('id');

    if(id == null) redirect404();
    else {
        fetchData(api + id)
        .then(kanap => {
            if(Object.keys(kanap).length === 0) redirect404();
            else{
                document.title = kanap.name
                
                createProduct(kanap);
            }
        })
        .catch(err => console.error(`Error while atempting to fetch product ${id}: \n ${err}`))
    }
}

const redirect404 = () => {
    window.location.href = new URL(window.location.origin + "/404");
}

/**
* Fill the page with the product value
* @param {Array} product 
*/
const createProduct = product => {
    let image = createImage(product.imageUrl, product.altTxt);
    
    document.getElementById('image').appendChild(image);
    
    document.getElementById('title').innerText = product.name;
    document.getElementById('price').innerText = product.price;
    document.getElementById('description').innerText = product.description;
    
    const colors = document.getElementById('colors');
    product.colors.forEach(color => {
        let option = document.createElement('option');
        option.value = color;
        option.text = color;
        colors.add(option);
    });
    
    document.getElementById('addToCart').onclick = () => {
        const quantity = document.getElementById('quantity').value;
        addCart(product._id, parseInt(quantity), colors.value);
        
    }
}

/**
* Add the product to the cart in the localstorage
* @param {string} id 
* @param {number} quantity 
* @param {string} color
*/
const addCart = (id, quantity, color) => {
    if(correctCart(color, quantity)) {
        const localS = window.localStorage;
        let panier = localS.panier;
        let indexPresent = -1;
        
        if(panier != null){
            panier = JSON.parse(panier);
            panier.forEach((element, index, array) => {
                if(element.id == id && element.color == color) {
                    indexPresent = index;
                }
            });
        }
        else {
            panier = new Array();
        }
        
        if(indexPresent != -1) {
            panier[indexPresent].qte += quantity
        }
        else {
            panier.push({
                id: id,
                color: color,
                qte: quantity
            })
        }
        
        localS.panier = JSON.stringify(panier);
        getAmountCart();
    }
}

/**
* Check if the color and quantity are correct
* @param {string} color 
* @param {number} quantity 
* @returns a boolean based on color and quantity
*/
const correctCart = (color, quantity) => {
    let colorBool = false;
    let quantityBool = false;
    
    if(color == '') {
        document.getElementById('colorErrorMsg').innerText = 'Couleur invalide';
    }
    else {
        document.getElementById('colorErrorMsg').innerText = '';
        colorBool = true;
    }
    
    if(Number.isNaN(quantity) || quantity <= 0) {
        document.getElementById('quantityErrorMsg').innerText = 'Quantité invalide';
    }
    else {
        document.getElementById('quantityErrorMsg').innerText = '';
        quantityBool = true;
    }
    
    return (colorBool && quantityBool);
}

getKanap();