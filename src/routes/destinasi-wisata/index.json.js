import { getDataFromFile } from '../../utilities/markdown';
import destinations, { getRandom } from './_destinations.js';
import { promotions } from '../../utilities/promotion';
import { prioritizePromo, prioritizePhoto } from '../../utilities/sort';

const contents = JSON.stringify({
	destinations: [...destinations.values()],
	randomDestinations: getRandom()
		.sort(prioritizePromo)
		.sort(prioritizePhoto)
		.slice(0, 4),
	destinationCategories: getDataFromFile('data/category-destination.yml').categories,
	destinationFacilities: getDataFromFile('data/facility-destination.yml').facilities,
	promotions: promotions
});

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}