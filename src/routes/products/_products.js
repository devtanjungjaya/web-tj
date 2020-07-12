import getMarkdownInDirectory from '../../utilities/markdown.js';
import formatRupiah from "../../utilities/currency";
const path = require('path');
const cwd = process.cwd()

let products = getMarkdownInDirectory(path.join(cwd, 'content/products/'));
products = products.map(product => {
    product.prices = product.prices.map(price => { 
        price.value = formatRupiah(price.value);
        return price;
    })
    return product;
})
export const map = new Map(products.map(product => [product.slug, product]));

export function getRandom() {
    return [...map.values()].sort(() => Math.random() - 0.5);;
}

export default map;