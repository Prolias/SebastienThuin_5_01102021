export const createDiv = (className) => {
    let div = document.createElement('div')
    
    addClassToElement(div, className)
    
    return div
}

export const createP = (inner, className) => {
    let p = document.createElement('p')
    
    addClassToElement(p, className)

    p.innerText = inner
    
    return p
}

export const createLink = (href, className) => {
    let link = document.createElement('a')
    link.href = href

    addClassToElement(link, className)

    return link
}

export const createArticle = (className) => {
    let article = document.createElement('article')

    addClassToElement(article, className)

    return article
}

export const createH3 = (inner, className) => {
    let h3 = document.createElement('h3')

    addClassToElement(h3, className)

    h3.innerText = inner

    return h3
}

export const createButton = (className) => {
    let button = document.createElement('button')
    button.type = 'button'
    
    addClassToElement(button, className)
    
    return button
}

export const createImage = (src, alt, className) => {
    let img = document.createElement('img')
    img.src = src
    img.alt = alt
    
    addClassToElement(img, className);
    
    return img
}

const addClassToElement = (element, className) => {
    if (className != null) {
        element.className = className;
    }
}