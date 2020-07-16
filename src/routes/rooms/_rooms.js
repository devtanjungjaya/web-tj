import getMarkdownInDirectory from '../../utilities/markdown.js';
const marked = require('marked');

const wysiwyg = ['description', 'notes'];

let rooms = getMarkdownInDirectory('content/rooms/');
rooms = rooms.map(room => 
    Object.assign(room, Object.fromEntries(wysiwyg.map(w => room[w] ? [w, marked(room[w])] : []))))
rooms.map(room => { room.categories = [room.category] })
export const map = new Map(rooms.map(room => [room.slug, room]));

export function getRandom() {
    return [...map.values()].sort(() => Math.random() - 0.5);;
}

export const publicFacilityIconMap = {
    'Restoran': 'ic_eat.svg'
}

export const roomFacilityIconMap = {
    'Kloset duduk': 'ic_toilet.svg'
}

export default map;