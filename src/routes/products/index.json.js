import products from './_products.js';
import { getDataFromFile } from '../../utilities/markdown';

const contents = JSON.stringify({
	products: [...products.values()],
	productCategories: getDataFromFile('data/category-product.yml')
});

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}