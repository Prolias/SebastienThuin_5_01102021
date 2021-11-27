import { createArticle, createH3, createImage, createLink, createP } from "../utils/createComponent.js";
import { fetchData } from "../utils/fetcher.js";
import { getAmountCart } from "../utils/gestionCart.js";
import { api } from "../utils/utils.js";

/**
* Fetch all Sofas from api and create a card for it
*/

let getAllKanap = () => {
    getAmountCart();

    fetchData(api)
        .then(allKanap => {
            allKanap.forEach(element => {
                createCard(element)
            });
        })
        .catch(err => console.error(`Error while atempting to fetch all products: \n ${err}`))
}

/**
 * Create a html card which display a product
 * @param {Array} product 
 */

let createCard = product => {
    let link = createLink(`/product/?id=${product._id}`);
    let article = createArticle();

    let image = createImage(product.imageUrl, product.altTxt);
    article.appendChild(image);

    let name = createH3(product.name, 'productName');
    article.appendChild(name);

    let desc = createP(product.description, 'productDescription');
    article.appendChild(desc);

    link.appendChild(article);
    document.getElementById('items').appendChild(link);
}

getAllKanap();

