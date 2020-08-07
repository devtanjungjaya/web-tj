import { adminContactsMap } from '../../utilities/contact';

const contents = JSON.stringify([...adminContactsMap.values()])

console.log(adminContactsMap)
console.log(adminContactsMap.values())
console.log(contents)

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}