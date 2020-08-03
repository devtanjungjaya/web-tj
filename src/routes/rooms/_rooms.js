import getMarkdownInDirectory from '../../utilities/markdown.js';
import { processPromotions } from '../../utilities/promotion';
import { adminContactsMap } from '../../utilities/contact';
const marked = require('marked');

const wysiwyg = ['description', 'notes'];

let rooms = getMarkdownInDirectory('content/rooms/');
rooms = rooms.map(room => 
    Object.assign(
        room, 
        Object.fromEntries(wysiwyg.map(w => room[w] ? [w, marked(room[w], { breaks: true })] : []))
    ))
    .map(room => {
        return {
            ...room,
            promotions: processPromotions(room.promotions || []),
            contact: adminContactsMap.get(room.contact),
            photos: room.photos.map(p => {
                p.photoURI = p.photoURI.substring(p.photoURI.indexOf('images/'))
                return p;
            })
        };
    });
rooms.map(room => { room.categories = [room.category] })
export const map = new Map(rooms.map(room => [room.slug, room]));

export function getRandom() {
    return [...map.values()].sort(() => Math.random() - 0.5);;
}

export const publicFacilityIconMap = {
    'Restoran': 'ic_eat.svg'
}

export const roomFacilityIconMap = {
    'Kloset duduk': 'ic_toilet.svg',
    'Kamar mandi dalam': 'ic_toilet.svg',
    'Shower': 'ic_shower.svg',
    'Wastafel': 'ic_shink.svg',
    'Air panas': 'ic_fire.svg',
    'AC': 'ic_snowflake.svg',
    'Kipas angin': 'ic_fan.svg',
    'Sofa': 'ic_sofa.svg'
}

export default map;