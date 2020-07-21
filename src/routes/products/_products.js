import getMarkdownInDirectory from '../../utilities/markdown.js';
const marked = require('marked');

const wysiwyg = ['description'];

let products = getMarkdownInDirectory('content/products/');
products = products.map(product => 
    Object.assign(product, Object.fromEntries(wysiwyg.map(w => product[w] ? [w, marked(product[w])] : []))))
export const map = new Map(products.map(product => [product.slug, product]));

export function getRandom() {
    return [...map.values()].sort(() => Math.random() - 0.5);;
}

export default map;