import rooms, { publicFacilityIconMap, roomFacilityIconMap } from './_rooms.js';

export function get(req, res, next) {
	const { slug } = req.params;

	if (rooms.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({ 
			...rooms.get(slug),
			publicFacilityIconMap,
			roomFacilityIconMap
		}));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}