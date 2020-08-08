import { getDataFromFile } from '../../utilities/markdown';
import tours, { getRandom } from './_tours.js';
import { promotions } from '../../utilities/promotion';
import { prioritizePromo } from '../../utilities/sort';

const contents = JSON.stringify({
	tours: [...tours.values()],
	randomTours: getRandom()
		.sort(prioritizePromo)
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