/**
 * Fetch data from url and return the json result
 * @param {String} url to fetch data from
 * @returns A json Object
 */
export const fetchData = (url) => { 
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(body => body.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}