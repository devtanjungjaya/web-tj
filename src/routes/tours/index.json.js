import tours from './_tours.js';

const contents = JSON.stringify([...tours.values()]);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}