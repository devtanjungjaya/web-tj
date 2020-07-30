import { getDataFromFile } from '../../utilities/markdown';
import tours, { getRandom } from './_tours.js';

const contents = JSON.stringify({
	tours: [...tours.values()],
	randomTours: getRandom().slice(0, 4),
	tourCategories: getDataFromFile('data/category-tour.yml').categories,
	tourFacilities: getDataFromFile('data/facility-tour.yml').facilities
});

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}