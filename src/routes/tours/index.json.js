import { getDataFromFile } from '../../utilities/markdown';
import tours from './_tours.js';

const contents = JSON.stringify({
	tours: [...tours.values()],
	tourCategories: getDataFromFile('data/category-tour.yml').categories,
	tourFacilities: getDataFromFile('data/facility-tour.yml').facilities
});

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}