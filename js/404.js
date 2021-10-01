
const delay = ms => new Promise(res => setTimeout(res, ms));

const redirect = async () => {
    await delay(10000);
    
    window.location.href = new URL(window.location.origin);
}

redirect();
