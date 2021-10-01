import { createArticle, createH3, createImage, createLink, createP } from "../utils/createComponent.js";
import { fetchData } from "../utils/fetcher.js";
import { getAmountCart } from "../utils/gestionCart.js";

const url = "http://localhost:3000/api/products";
let allKanap;

/**
* Fetch all Sofas from api
*/

let getAllKanap = async () => {
    getAmountCart();

    allKanap = await fetchData(url);

    allKanap.forEach(element => {
        createCard(element)
    });
}

let createCard = (value) => {
    let link = createLink(`/product/?id=${value._id}`);
    let article = createArticle();

    let image = createImage(value.imageUrl, value.altTxt);
    article.appendChild(image);

    let name = createH3(value.name, 'productName');
    article.appendChild(name);

    let desc = createP(value.description, 'productDescription');
    article.appendChild(desc);

    link.appendChild(article);
    document.getElementById('items').appendChild(link);
}

getAllKanap();

