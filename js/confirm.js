const url = "http://localhost:3000/api/products/orders";

const commande = () => {
    if(window.localStorage.confirm) {
        confirm()
    }
    else {
        const redirect = new URL(window.location.origin + "/404");
        window.location.href = redirect;
    }
}

const confirm = async () => {
    let response = await fetch( "http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: window.localStorage.confirm
    });

    let result = await response.json();

    document.getElementById("orderId").innerText = result.orderId;

    window.localStorage.clear();
}

commande();
