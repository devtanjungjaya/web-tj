import products from './_products.js';

const contents = JSON.stringify([...products.values()]);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}