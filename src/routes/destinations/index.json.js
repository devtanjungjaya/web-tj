import { getDataFromFile } from '../../utilities/markdown';
import destinations from './_destinations.js';

const contents = JSON.stringify({
	destinations: [...destinations.values()],
	destinationCategories: getDataFromFile('data/category-destination.yml').categories,
	destinationFacilities: getDataFromFile('data/facility-destination.yml').facilities
});

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}