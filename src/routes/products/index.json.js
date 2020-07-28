import products, { getRandom } from './_products.js';
import { getDataFromFile } from '../../utilities/markdown';

const contents = JSON.stringify({
	products: [...products.values()],
	randomProducts: getRandom().slice(0, 4),
	productCategories: getDataFromFile('data/category-product.yml').categories
});

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}