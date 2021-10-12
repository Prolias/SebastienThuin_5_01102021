import { createArticle, createButton, createDiv, createH2, createImage, createP } from "../utils/createComponent.js";
import { fetchData } from "../utils/fetcher.js";

const url = "http://localhost:3000/api/products/";
let cartLs = []

let total = 0;

if(window.localStorage.panier != null) {
    cartLs = JSON.parse(window.localStorage.panier);
}


const getAllPanier = async () => {
    setTotal();
    getAmount();
    
    cycleData();
    
    const order = document.getElementById('order');
    
    order.onclick = () => {
        postCart();
    }

    postCart();
}

const setTotal = () => {
    document.getElementById('totalPrice').innerText = `${total}`;
}

const getAmount = () => {
    document.getElementById('totalQuantity').innerText = cartLs.length;
    document.getElementById('amountCart').innerText = cartLs.length;
}

const cycleData = () => {
    let i = 0;
    
    cartLs.forEach(async (el) => {
        let line = await fetchData(url + el);
        createLine(line, i);
        
        total += line.price;
        
        i += 1;
        
        setTotal();
    });
}

const createLine = (object, i) => {
    const line = createArticle('cart__item');
    line.dataset.id = object._id;

    const divImg = createDiv('cart__item__img');
    const img = createImage(object.imageUrl, object.altTxt)
    divImg.appendChild(img);
    line.appendChild(divImg);

    const divContent = createDiv('cart__item__content');
        const divTitlePrice = createDiv('cart__item__content__titlePrice');
            const title = createH2(object.name);
            divTitlePrice.appendChild(title);
            const price = createP(`${object.price} €`);
            divTitlePrice.appendChild(price);
        divContent.appendChild(divTitlePrice);
        const divSettings = createDiv('cart__item__content__settings');
            const divQuantite = createDiv('quantite__item__content__settings__quantity')
                divQuantite.appendChild(createP('Qté : '));
            divSettings.appendChild(divQuantite);
            const divDelete = createDiv('delete__item__content__settings__delete');
                const deleteBtn = createButton('Supprimer', 'deleteItem');
                    deleteBtn.onclick = () => {
                        deleteItemCart(i)
                    }
                divDelete.appendChild(deleteBtn);
            divSettings.appendChild(divDelete);
        divContent.appendChild(divSettings);
    line.appendChild(divContent);
    
    document.getElementById('cart__items').appendChild(line);
}

const deleteItemCart = i => {
    cartLs.splice(i, 1);
    
    window.localStorage.panier = JSON.stringify(cartLs);
    
    document.getElementById('cart__items').innerText = ''
    total = 0;
    
    setTotal();
    
    cycleData();
    
    getAmount();
}

const postCart = async () => {
    const button = document.getElementById("order");

    button.onclick = () => {
        
        const contact = {
            "firstName": document.getElementById("firstName").value,
            "lastName": document.getElementById("lastName").value,
            "address": document.getElementById("address").value,
            "city": document.getElementById("city").value,
            "email": document.getElementById("email").value
        }
        
        const body = {
            "contact": contact,
            "products": cartLs
        }

        window.localStorage.confirm = JSON.stringify(body);

        const redirect = new URL(window.location.origin + "/confirmation/");
        window.location.href = redirect;
    }
}

getAllPanier();
