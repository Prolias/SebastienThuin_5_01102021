const storage = window.localStorage;

/**
 * Fill the badge in the menu section with the amount of products in cart
 */
export const getAmountCart = () => {
    const amountCart = document.getElementById('amountCart');
    if(returnAmount() != 0) {
        amountCart.style.display = 'flex';
        amountCart.innerText = returnAmount();
    }
    else amountCart.style.display = 'none';
}

/**
 * Get the amount of product in the cart
 * @returns the amount of products
 */
export const returnAmount = () => {
    let cartAmount = 0;
    let cart = storage.panier;
    if(cart != null) {
        cart = JSON.parse(cart);
        cart.forEach((element, index, array) => {
            cartAmount += element.qte
        })
    }
    return cartAmount;
}