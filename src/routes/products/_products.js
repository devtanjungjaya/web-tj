const path = require('path');
import getMarkdownInDirectory from '../../utilities/markdown.js';
const cwd = process.cwd()

const products = getMarkdownInDirectory(path.join(cwd, 'content/products/'));

export default new Map(products.map(product => [product.slug, product]));