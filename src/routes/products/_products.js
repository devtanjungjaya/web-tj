const path = require('path');
import getMarkdownInDirectory from '../../utilities/markdown.js';
const cwd = process.cwd()

const products = getMarkdownInDirectory(path.join(cwd, 'content/products/'));
export const map = new Map(products.map(product => [product.slug, product]));

export function getRandom() {
    return [...map.values()].sort(() => Math.random() - 0.5);;
}

export default map;