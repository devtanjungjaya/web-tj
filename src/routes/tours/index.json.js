import { getDataFromFile } from '../../utilities/markdown';
import tours, { getRandom } from './_tours.js';
import { promotions } from '../../utilities/promotion';

const contents = JSON.stringify({
	tours: [...tours.values()],
	randomTours: getRandom()
		.sort((a, b) => {
			const promotionsA = a.promotions ? a.promotions : [];
			const promotionsB = b.promotions ? b.promotions : [];
			if(promotionsA.length > 0 === promotionsB.length > 0) return 0;
			else if(promotionsA.length) return -1;
			else return 1;
		})
		.slice(0, 4),
	tourCategories: getDataFromFile('data/category-tour.yml').categories,
	tourFacilities: getDataFromFile('data/facility-tour.yml').facilities,
	promotions
});

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}