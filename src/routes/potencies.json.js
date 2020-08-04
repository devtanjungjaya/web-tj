import { getDataFromFile } from '../utilities/markdown';

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(getDataFromFile('data/potency.yml').potencies));
}