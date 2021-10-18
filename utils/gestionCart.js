const storage = window.localStorage;

export const getAmountCart = () => {
    document.getElementById('amountCart').innerText = returnAmount();
}

export const returnAmount = () => {
    let cartAmount = 0;
    let cart = storage.panier;
    if(cart != null) {
        cart = new Map(JSON.parse(cart));
        cart.forEach((value, key, map) => {
            cartAmount += value
        })
    }
    return cartAmount;
}

export const deleteAllCart = () => {
    storage.clear()

    getAmountCart();
}