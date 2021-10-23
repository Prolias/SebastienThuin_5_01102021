/**
 * Fetch data from url and return the json result
 * @param {String} url to fetch data from
 * @returns A json Object
 */
export const fetchData = async (url) => {
    try {
        let res = await fetch(url);
        return await res.json();
    }
    catch (err) {
        console.error(err);
    }
}