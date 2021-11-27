import { getAmountCart } from "../utils/gestionCart.js";
import { api } from "../utils/utils.js";

/**
 * If the confirm array in localstorage is found execute the confirm function else redirect to the main page
 */
const commande = () => {
    getAmountCart()
    if(window.localStorage.confirm) {
        confirm()
    }
    else {
        window.location.href = new URL(window.location.origin + "/404");
    }
}

/**
 * Post the data from the cart form then give an orderId for the client
 */
const confirm = async () => {
    let response = await fetch( `${api}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: window.localStorage.confirm
    });

    let result = await response.json();

    document.getElementById("orderId").innerText = result.orderId;

    window.localStorage.clear();
    getAmountCart();
}

commande();
