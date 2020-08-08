import { getDataFromFile } from '../../utilities/markdown';
import rooms, { getRandom } from './_rooms.js';
import { promotions } from '../../utilities/promotion';
import { prioritizePromo, prioritizePhoto } from '../../utilities/sort';

const contents = JSON.stringify({
	rooms: [...rooms.values()],
	randomRooms: getRandom()
		.sort(prioritizePromo)
		.sort(prioritizePhoto)
		.slice(0, 4),
	roomCategories: getDataFromFile('data/category-room.yml').categories,
	roomFacilities: getDataFromFile('data/facility-room.yml').roomFacilities,
	publicFacilities: getDataFromFile('data/facility-room.yml').publicFacilities,
	promotions
});

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}