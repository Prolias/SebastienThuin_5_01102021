import { createImage } from "../utils/createComponent.js";
import { fetchData } from "../utils/fetcher.js";
import { getAmountCart } from "../utils/gestionCart.js";

const id = (new URL(document.location)).searchParams.get('id');
const url = "http://localhost:3000/api/products/";

let kanap;

const getKanap = async () => {
    getAmountCart();
    
    kanap = await fetchData(url + id);
    
    if(id == null || Object.keys(kanap).length === 0) {
        const redirect = new URL(window.location.origin + "/404");
        window.location.href = redirect;
    }
    else{
        document.title = kanap.name
        
        createProduct(kanap);
    }
}

const createProduct = (value) => {
    let image = createImage(value.imageUrl, value.altTxt);
    
    document.getElementById('image').appendChild(image);
    
    document.getElementById('title').innerText = value.name;
    document.getElementById('price').innerText = value.price;
    document.getElementById('description').innerText = value.description;
    
    
    document.getElementById('addToCart').onclick = () => {
        const quantity = document.getElementById('quantity').value;
        addCart(value._id, parseInt(quantity));
        
    }
}

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