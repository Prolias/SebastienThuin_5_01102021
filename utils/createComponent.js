/**
 * Create a div element for the DOM
 * @param {String} className 
 * @returns A div element
 */
export const createDiv = (className) => {
    let div = document.createElement('div')
    
    addClassToElement(div, className)
    
    return div
}

/**
 * Create a p element for the DOM
 * @param {String} inner text inside the tag 
 * @param {String} className
 * @returns A p element
 */
export const createP = (inner, className) => {
    let p = document.createElement('p')
    
    addClassToElement(p, className)

    p.innerText = inner
    
    return p
}

/**
 * Create a 'a' element for the DOM
 * @param {String} href 
 * @param {String} className 
 * @returns A link element
 */
export const createLink = (href, className) => {
    let link = document.createElement('a')
    link.href = href

    addClassToElement(link, className)

    return link
}

/**
 * Create an article element for the DOM
 * @param {String} className 
 * @returns An article element
 */
export const createArticle = (className) => {
    let article = document.createElement('article')

    addClassToElement(article, className)

    return article
}

/**
 * Create a h3 element for the DOM
 * @param {String} inner text inside the tag
 * @param {String} className 
 * @returns A h3 element
 */
export const createH3 = (inner, className) => {
    let h3 = document.createElement('h3')

    addClassToElement(h3, className)

    h3.innerText = inner

    return h3
}

/**
 * Create a h2 element for the DOM
 * @param {String} inner text inside the tag
 * @param {String} className 
 * @returns A h2 element
 */
export const createH2 = (inner, className) => {
    let h2 = document.createElement('h2')

    addClassToElement(h2, className)

    h2.innerText = inner

    return h2
}

/**
 * Create a button element for the DOM
 * @param {String} inner text inside the button
 * @param {String} className 
 * @returns A button element
 */
export const createButton = (inner, className) => {
    let button = document.createElement('button')
    button.type = 'button'

    button.innerText = inner;
    
    addClassToElement(button, className)
    
    return button
}

/**
 * Create an image element for the DOM
 * @param {String} src 
 * @param {String} alt 
 * @param {String} className 
 * @returns An image element
 */
export const createImage = (src, alt, className) => {
    let img = document.createElement('img')
    img.src = src
    img.alt = alt
    
    addClassToElement(img, className);
    
    return img
}

/**
 * Add a class to an element
 * @param {Dom element} element 
 * @param {String} className 
 */
const addClassToElement = (element, className) => {
    if (className != null) {
        element.className = className;
    }
}