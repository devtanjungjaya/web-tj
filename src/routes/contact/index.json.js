import { adminContactsMap } from '../../utilities/contact';

const contents = JSON.stringify(
	[...adminContactsMap.entries()].map(([admin, contact]) => ({
		admin,
		contact
	})))

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}