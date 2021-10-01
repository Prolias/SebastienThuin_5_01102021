export const fetchData = async (url) => {
    try {
        let res = await fetch(url);
        return await res.json();
    }
    catch (err) {
        console.error(err);
    }
}