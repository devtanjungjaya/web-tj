import destinations, { facilityIconMap } from './_destinations.js';

export function get(req, res, next) {
	const { slug } = req.params;

	if (destinations.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({...destinations.get(slug), facilityIconMap}));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}