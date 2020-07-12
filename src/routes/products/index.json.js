import products, { getRandom } from './_products.js';

const contents = JSON.stringify([...products.values(), ...getRandom()]);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}