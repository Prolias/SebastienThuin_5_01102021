const storage = window.localStorage;

export const getAmountCart = () => {
    let cartAmount = 0;
    let cart = storage.panier;
    if(cart != null) {
        cart = JSON.parse(cart);
        cartAmount = cart.length
    }
    
    document.getElementById('amountCart').innerText = cartAmount;

}

export const addToCart = (id) => {
    let cart = [];
    let getCart = storage.panier;
    if(getCart != null) {
        cart = JSON.parse(getCart)
    }
    cart.push(id);
    cart = JSON.stringify(cart);
    storage.panier = cart;

    getAmountCart();
}

export const deleteAllCart = () => {
    storage.clear()

    getAmountCart();
}