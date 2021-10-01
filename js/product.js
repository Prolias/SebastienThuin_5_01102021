import { createDiv, createImage, createButton } from "../utils/createComponent.js";
import { fetchData } from "../utils/fetcher.js";
import { addToCart, getAmountCart } from "../utils/gestionCart.js";

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

    
}

getKanap();