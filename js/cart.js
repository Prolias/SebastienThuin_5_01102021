import { createArticle, createButton, createDiv, createH2, createImage, createP } from "../utils/createComponent.js";
import { fetchData } from "../utils/fetcher.js";
import { getAmountCart, returnAmount } from "../utils/gestionCart.js";
import { api } from "../utils/utils.js";

let cartLs = new Array();

let total = 0;

if(window.localStorage.panier != null) {
    cartLs = JSON.parse(window.localStorage.panier);
}

/**
 * Execute all the functions needed to get the cart and show it 
 */
const getAllPanier = async () => {
    setTotalPrice();
    getAmountCart();
    
    cycleData();

    postCart();
}

/**
 * Set the total price in cart
 */
const setTotalPrice = () => {
    document.getElementById('totalPrice').innerText = `${total}`;
}

/**
 * Set the total quantity of products in cart
 */
const setTotalQte = () => {
    document.getElementById('totalQuantity').innerText = returnAmount();
}

/**
 * Cycle through all the products in the localStorage then call the createLine function
 */
const cycleData = () => {
    document.getElementById('cart__items').innerText = '';
    total = 0;
    const order = document.getElementById('cartForm');
    if(returnAmount() == 0) {
        order.style.display = 'none';
    }
    else {
        order.style.display= 'block';
    }
    
    cartLs.forEach((element, index) => {
        fetchData(api + element.id)
            .then(line => createLine(line, element.qte, index, element.color))
            .catch(err => console.error(`Error while atempting to fetch product ${element.id}: \n ${err}`))
    })

    totalPrice();    
    setTotalQte();
}

/**
 * Get the total price for the cart
 */
const totalPrice = () => {
    total = 0;
    if(cartLs.length == 0) setTotalPrice()
    else{
        cartLs.forEach((element) => {
            fetchData(api + element.id)
            .then(product => {
                total += product.price * element.qte
                setTotalPrice();
            })
            .catch(err => console.error(`Error while atempting to fetch product ${element.id}: \n ${err}`))
        })
    }
}

/**
 * Create a line with all the information of the product
 * @param {Array} object the product
 * @param {Number} qte the quantity of product
 * @param {Number} index the index in localStorage
 * @param {String} color the color of product
 */
const createLine = (object, qte, index, color) => {
    const line = createArticle('cart__item');
    line.dataset.id = object._id;
    
    const divImg = createDiv('cart__item__img');
    const img = createImage(object.imageUrl, object.altTxt)
    divImg.appendChild(img);
    line.appendChild(divImg);
    
    const divContent = createDiv('cart__item__content');
    const divTitlePrice = createDiv('cart__item__content__titlePrice');
    const title = createH2(`${object.name} | ${color}`);
    divTitlePrice.appendChild(title);
    const price = createP(`${object.price} €`);
    divTitlePrice.appendChild(price);
    divContent.appendChild(divTitlePrice);
    const divSettings = createDiv('cart__item__content__settings');
    const divQuantite = createDiv('quantite__item__content__settings__quantity')
    divQuantite.appendChild(createP(`Qté :`));
    const inputQuantite = document.createElement('input');
    inputQuantite.type = 'number';
    inputQuantite.className = 'itemQuantity'
    inputQuantite.name = 'itemQuantity';
    inputQuantite.min = 1;
    inputQuantite.max = 100;
    inputQuantite.value = qte;
    inputQuantite.onchange = () => {
        changeQteProduct(index, inputQuantite);
    }
    divQuantite.appendChild(inputQuantite);
    divSettings.appendChild(divQuantite);
    const divDelete = createDiv('delete__item__content__settings__delete');
    const deleteBtn = createButton('Supprimer', 'deleteItem');
    deleteBtn.onclick = () => {
        deleteItemCart(index);
    }
    divDelete.appendChild(deleteBtn);
    divSettings.appendChild(divDelete);
    divContent.appendChild(divSettings);
    line.appendChild(divContent);
    
    document.getElementById('cart__items').appendChild(line);
}

/**
 * Change the total quantity and the total price in terms of the input value for each product
 * @param {number} index • product index in cartLs
 * @param {DomElement} inputQuantite • The input elemenbt which contains the value
 */
const changeQteProduct = (index, inputQuantite) => {
    cartLs[index].qte = parseInt(inputQuantite.value);
    window.localStorage.panier = JSON.stringify(cartLs);
    setTotalQte();
    getAmountCart();
    totalPrice();
}

/**
 * Get the product and delete it from the cart
 * @param {Number} index in the cart
 */
const deleteItemCart = index => {
    cartLs.splice(index, 1);
    
    window.localStorage.panier = JSON.stringify(cartLs);
    totalPrice();
    
    cycleData();
    
    getAmountCart();
}

/* Regex check */

/**
 * Regex which verify if it's a name
 * @param {string} value 
 * @returns true or false
 */
const regexName = value => /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/.test(value);

/**
 * Regex which verify if it's an address
 * @param {string} value 
 * @returns true or false
 */
const regexAddress = value => /^[#.0-9a-zA-Z\s,-]+$/.test(value);

/**
 * Regex which verify if it's a city
 * @param {string} value 
 * @returns true or false
 */
const regexCity = value => /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:[\s-][a-zA-Z]+)*$/.test(value);

/**
 * Regex which verify if it's an email
 * @param {string} value 
 * @returns true or false
 */
const regexEmail = value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

/**
 * Test if a contact is valid else show error message
 * @param {Array} contact 
 * @returns true or false
 */
const testContact = contact => {
    resetError();
    if(regexName(contact.firstName) && regexName(contact.lastName) && regexAddress(contact.address) && regexCity(contact.city) && regexEmail(contact.email)) {
        return true;
    }
    else {
        if(!regexName(contact.firstName)) document.getElementById('firstNameErrorMsg').innerText = 'Prénom invalide'
        if(!regexName(contact.lastName)) document.getElementById('lastNameErrorMsg').innerText = 'Nom invalide'
        if(!regexAddress(contact.address)) document.getElementById('addressErrorMsg').innerText = 'Adresse invalide'
        if(!regexCity(contact.city)) document.getElementById('cityErrorMsg').innerText = 'Ville invalide'
        if(!regexEmail(contact.email)) document.getElementById('emailErrorMsg').innerText = 'Email invalide'
        
        return false;
    }
}

/**
 * Reset all error messages
 */
const resetError = () => {
    document.getElementById('firstNameErrorMsg').innerText = '';
    document.getElementById('lastNameErrorMsg').innerText = '';
    document.getElementById('addressErrorMsg').innerText = '';
    document.getElementById('cityErrorMsg').innerText = '';
    document.getElementById('emailErrorMsg').innerText = '';
}

/**
 * Get all information from the form, test if it's valid then send an array of product and all contact information to the confirmation page
 */
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

        const products = arrayProducts(cartLs);

        console.log(products);

        if(testContact(contact)) {
            const body = {
                "contact": contact,
                "products": products
            }
            
            window.localStorage.confirm = JSON.stringify(body);
            
            const redirect = new URL(window.location.origin + "/confirmation/");
            window.location.href = redirect;
            
        }
    }
}

/**
 * Get a map of products and transform it to an array of products
 * @param {Map} map 
 * @returns An array of products
 */
const arrayProducts = map => {
    let array = [];

    map.forEach( (element, index) => {
        for (let i = 0; i < element.qte; i++) {
            array.push(element.id);
        }
    })

    return array;
}

getAllPanier();
