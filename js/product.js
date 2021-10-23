import { createImage } from "../utils/createComponent.js";
import { fetchData } from "../utils/fetcher.js";
import { getAmountCart } from "../utils/gestionCart.js";
import { api } from "../utils/utils.js";

const id = (new URL(document.location)).searchParams.get('id');

let kanap;

/**
 * Fetch the product from url then fill spaces in page or redirect to main page
 */

const getKanap = async () => {
    getAmountCart();
    
    kanap = await fetchData(api + id);
    
    if(id == null || Object.keys(kanap).length === 0) {
        const redirect = new URL(window.location.origin + "/404");
        window.location.href = redirect;
    }
    else{
        document.title = kanap.name
        
        createProduct(kanap);
    }
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
    
    
    document.getElementById('addToCart').onclick = () => {
        const quantity = document.getElementById('quantity').value;
        addCart(product._id, parseInt(quantity));
        
    }
}

/**
 * Add the product to the cart in the localstorage
 * @param {string} id 
 * @param {number} quantity 
 */
const addCart = (id, quantity) => {
    if(Number.isNaN(quantity) || quantity <= 0) {
        document.getElementById('quantityErrorMsg').innerText = 'Quantité invalide';
    }
    else {
        document.getElementById('quantityErrorMsg').innerText = '';
        const localS = window.localStorage;
        let panier = localS.panier;
        if(panier != null){
            panier = new Map(JSON.parse(panier));
        }
        else {
            panier = new Map();
        }
        if(panier.has(id)) {
            panier.set(id, panier.get(id) + quantity);
        }
        else {
            panier.set(id, quantity);
        }
        
        localS.panier = JSON.stringify(Array.from(panier));
        getAmountCart();
    }
}

getKanap();