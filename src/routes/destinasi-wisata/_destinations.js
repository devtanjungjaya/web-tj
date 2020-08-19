import getMarkdownInDirectory, { shuffleArray } from '../../utilities/markdown.js';
import { processPromotions } from '../../utilities/promotion';
import { adminContactsMap } from '../../utilities/contact';
const marked = require('marked');

const wysiwyg = ['description', 'notes'];

let destinations = getMarkdownInDirectory('content/destinasi-wisata/');
destinations = destinations.map(destination => 
    Object.assign(
        destination, 
        Object.fromEntries(wysiwyg.map(w => destination[w] ? [w, marked(destination[w], { breaks: true })] : []))
    ))
    .map(destination => {
        return {
            ...destination,
            promotions: processPromotions(destination.promotions || []),
            contact: adminContactsMap.get(destination.contact) || [],
            photos: destination.photos.map(p => {
                p.photoURI = p.photoURI.substring(p.photoURI.indexOf('images/'))
                return p;
            })
        };
    });
export const map = new Map(destinations.map(destination => [destination.slug, destination]));

export function getRandom() {
    return shuffleArray([...map.values()]);
}

export const facilityIconMap = {
    'Rumah makan': 'ic_eat.svg',
    'Spot foto': 'ic_camera.svg',
    'Toilet umum': 'ic_toilet.svg',
    'Musholla': 'ic_mosque.svg',
    'Tempat parkir': 'ic_park.svg',
    'Toko oleh-oleh': 'ic_bag.svg',
    'Kolam renang': 'ic_pool.svg',
    'Tempat bermain anak': 'ic_lego.svg',
    'Gazebo': 'ic_gazebo.svg',
    'Penginapan': 'ic_house.svg',
    'Tempat berkemah': 'ic_tent.svg',
    'Pos penjaga': 'ic_hall.svg',
    'Toko kecil': 'ic_minimarket.svg'
}

export default map;