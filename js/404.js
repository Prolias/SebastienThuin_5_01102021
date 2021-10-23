/**
 * Redirect the user after 10sec to the main page
 */
const redirect = async () => {
    await new Promise(res => setTimeout(res, 10000));
    
    window.location.href = new URL(window.location.origin);
}

redirect();
