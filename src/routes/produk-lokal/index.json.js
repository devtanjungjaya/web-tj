import products, { getRandom } from './_products.js';
import { getDataFromFile } from '../../utilities/markdown';
import { promotions } from '../../utilities/promotion';

const contents = JSON.stringify({
	products: [...products.values()],
	randomProducts: getRandom()
		.sort((a, b) => {
			const promotionsA = a.promotions ? a.promotions : [];
			const promotionsB = b.promotions ? b.promotions : [];
			if(promotionsA.length > 0 === promotionsB.length > 0) return 0;
			else if(promotionsA.length) return -1;
			else return 1;
		})
		.slice(0, 4),
	productCategories: getDataFromFile('data/category-product.yml').categories,
	promotions
});

// console.log(products.values())

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}